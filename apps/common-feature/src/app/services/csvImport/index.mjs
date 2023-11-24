import mongoose from "mongoose";
import csv from "csv-parser";
import fs from "fs";
import nodemailer from "nodemailer";
import Deal from "./models/deals.mjs";
import ImportFile from "./models/import-file.mjs";
import User from "./models/user.mjs";
import Stage from "./models/deal-stage.mjs";
import Pipeline from "./models/deal-pipeline.mjs";

const mongoUri = process.env.DATABASE_URL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noorulain.sifaat@gmail.com",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const handler = async (event) => {
  try {
    //import file record id
    const id = event.rawPath.replace("/", "");
    if (!id) {
      return { statusCode: 400, body: "ID is required." };
    }
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const fileData = await ImportFile.findOne({ _id: id }).populate("userId");
    if (!fileData) {
      return { statusCode: 400, body: "File not found." };
    }

    const csvFilePath = fileData.filePath;
    const unsavedRows = [];
    const csvData = [];

    const parseCsvPromise = new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          csvData.push(row);
        })
        .on("end", async () => {
          try {
            for (const row of csvData) {
              try {
                // Create a new Deal instance dynamically using column names
                const acc = {};
                for (const columnName of fileData.dataColumn) {
                  if (columnName === "contactedPersonId") {
                    const contact = await User.findOne({
                      email: { $regex: new RegExp(row[columnName], "i") },
                    });
                    acc[columnName] = contact ? contact._id.toString() : "";
                  } else if (columnName === "dealPiplineId") {
                    const pipeline = await Pipeline.findOne({
                      name: { $regex: new RegExp(row[columnName], "i") },
                    });

                    acc[columnName] = pipeline ? pipeline._id.toString() : "";
                  } else if (columnName === "dealStageId") {
                    const stage = await Stage.findOne({
                      name: { $regex: new RegExp(row[columnName], "i") },
                    });

                    acc[columnName] = stage ? stage._id.toString() : "";
                  } else if (columnName === "dealOwnerId") {
                    const owner = await User.findOne({
                      email: { $regex: new RegExp(row[columnName], "i") },
                    });
                    acc[columnName] = owner ? owner._id.toString() : "";
                  } else {
                    acc[columnName] = row[columnName];
                  }
                }

                const deal = new Deal(acc);

                await deal.save().catch((error) => {
                  unsavedRows.push(row);
                  console.error(
                    "Error saving data to MongoDB:",
                    row,
                    error.message
                  );
                });

                console.log("Data saved to MongoDB");
              } catch (error) {
                console.error("Error saving data to MongoDB:", error);
              }
            }

            // Send an email with unsaved rows if there are any
            if (unsavedRows?.length > 0) {
              const emailBody = `Unsaved Rows:\n${JSON.stringify(
                unsavedRows,
                null,
                2
              )}`;

              const mailOptions = {
                from: "noorulain.sifaat@gmail.com",
                to:  fileData.userId?.email,
                subject: "Unsaved Rows Notification",
                text: emailBody,
              };
              await ImportFile.findOneAndUpdate(
                { _id: id },
                { status: "failed" }
              );
              await transporter.sendMail(mailOptions);
            } else {
              await ImportFile.findOneAndUpdate(
                { _id: id },
                { status: "completed" }
              );
            }
            // Disconnect from MongoDB after all data is processed
            await mongoose.connection.close();
            resolve();
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        });
      console.log(event);
    });
    await parseCsvPromise;
    return { statusCode: 200, body: "CSV Imported Successfully." };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
