import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ContactCallRepository,
  ContactMeetingRepository,
  ContactNoteRepository,
  ContactRepository,
  ContactStateRepository,
  LifecycleStagesRepository,
  UserRepository,
} from '@shared';
import { ContactAssociationEnum, successResponse } from '@shared/constants';
import {
  AssignContactOwnerDto,
  ContactCallDeleteDto,
  ContactCallFilterDto,
  ContactCallIdParamDto,
  ContactDeleteDto,
  ContactDeletedFilterDto,
  ContactFilterDto,
  ContactIdParamDto,
  ContactMeetingDeleteDto,
  ContactMeetingFilterDto,
  ContactMeetingIdParamDto,
  ContactNoteDeleteDto,
  ContactNoteFilterDto,
  ContactNoteIdParamDto,
  CreateContactCallDto,
  CreateContactDto,
  CreateContactMeetingDto,
  CreateContactNoteDto,
  EditContactCallDto,
  EditContactDto,
  EditContactMeetingDto,
  EditContactNoteDto,
  GetContactAssociatinsDto,
  MediaObject,
  RescheduleContactCallDto,
  RescheduleContactMeetingDto,
  ResetOutcomeContactCallDto,
  ResetOutcomeContactMeetingDto,
} from '@shared/dto';
import { S3Service } from '@shared/services';
import dayjs from 'dayjs';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
    private statusRepository: ContactStateRepository,
    private lifecycleRepository: LifecycleStagesRepository,
    private contactNoteRepository: ContactNoteRepository,
    private contactCallRepository: ContactCallRepository,
    private contactMeetingRepository: ContactMeetingRepository,
    private s3: S3Service
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async getContactTasks(payload: ContactNoteFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      delete payload.page;
      delete payload.limit;

      const filterQuery = {
        ...payload,
        ...this.notDeletedFilter,
      };

      const paginateRes = await this.contactRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Contact Tasks Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async restoreContact(payload: ContactIdParamDto) {
    try {
      const { contactId } = payload;

      await this.contactRepository.findOneAndUpdate(
        { _id: contactId, isDeleted: true },
        this.notDeletedFilter
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Restored Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getDeletedContacts(payload: ContactDeletedFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      const { search } = payload;

      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};

      if (payload.startDate) {
        const startDate = dayjs(payload.startDate).startOf('day');
        createdAtFilter['deletedAt'] = {
          gte: startDate.toDate(),
        };
        delete payload.startDate;
      }
      if (payload.endDate) {
        const endDate = dayjs(payload.endDate).endOf('day');
        createdAtFilter['deletedAt'] = {
          lte: endDate.toDate(),
        };
        delete payload.endDate;
      }

      let searchFilter = {};
      if (search) {
        searchFilter = {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              lastName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
          ],
        };
      }

      const filterQuery = {
        ...createdAtFilter,
        ...payload,
        isDeleted: true,
        ...searchFilter,
      };

      const paginateRes = await this.contactRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Deleted Contacts Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactAssociations(payload: GetContactAssociatinsDto) {
    try {
      const { association_type } = payload;

      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      delete payload.page;
      delete payload.limit;

      let res;

      if (association_type == ContactAssociationEnum.ATTACHMENTS)
        res = await this.contactRepository.paginate({
          filterQuery: {},
          offset: skip,
          limit: take,
        });
      if (association_type == ContactAssociationEnum.COMPANIES)
        res = await this.contactRepository.paginate({
          filterQuery: {},
          offset: skip,
          limit: take,
        });
      if (association_type == ContactAssociationEnum.DEALS)
        res = await this.contactRepository.paginate({
          filterQuery: {},
          offset: skip,
          limit: take,
        });
      if (association_type == ContactAssociationEnum.PLAYBOOKS)
        res = await this.contactRepository.paginate({
          filterQuery: {},
          offset: skip,
          limit: take,
        });
      if (association_type == ContactAssociationEnum.TICKETS)
        res = await this.contactRepository.paginate({
          filterQuery: {},
          offset: skip,
          limit: take,
        });

      return successResponse(
        HttpStatus.OK,
        'Contacts Associatins Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createContact(payload: CreateContactDto) {
    try {
      const s3Response = await this.s3.uploadFile(
        payload.profilePicture,
        'contacts/{uuid}'
      );

      const profilePicture: MediaObject = {
        ...s3Response,
        size: payload.profilePicture.size,
        mimetype: payload.profilePicture.mimetype,
      };

      if (payload.contactOwnerId)
        await this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });
      else payload.contactOwnerId = payload.createdBy;

      if (payload.lifeCycleStageId)
        await this.lifecycleRepository.findOne({
          _id: payload.lifeCycleStageId,
          ...this.notDeletedFilter,
        });

      if (payload.statusId)
        await this.statusRepository.findOne({
          _id: payload.statusId,
          ...this.notDeletedFilter,
        });

      payload.profilePicture = profilePicture;

      const res = await this.contactRepository.create(payload);

      return successResponse(
        HttpStatus.CREATED,
        'Contact created successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContact(payload: ContactIdParamDto) {
    try {
      const res = await this.contactRepository.findOne({
        _id: payload.contactId,
        ...this.notDeletedFilter,
      });
      return successResponse(HttpStatus.OK, 'Contact Get Successfully', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContacts(payload: ContactFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      const { search } = payload;

      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }
      if (payload.lastActivityDate) {
        const startDate = dayjs(payload.lastActivityDate).startOf('day');
        const endDate = dayjs(payload.lastActivityDate).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.lastActivityDate;
      }
      if (payload.nextActivityDate) {
        const startDate = dayjs(payload.nextActivityDate).startOf('day');
        const endDate = dayjs(payload.nextActivityDate).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.nextActivityDate;
      }

      let searchFilter = {};
      if (search) {
        searchFilter = {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              lastName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
          ],
        };
      }

      const filterQuery = {
        ...createdAtFilter,
        ...payload,
        ...this.notDeletedFilter,
        ...searchFilter,
      };

      const paginateRes = await this.contactRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Contacts Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editContact(payload: EditContactDto) {
    try {
      const { contactId } = payload;
      await this.contactRepository.findOne({
        _id: contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        await this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });

      if (payload.lifeCycleStageId)
        await this.lifecycleRepository.findOne({
          _id: payload.lifeCycleStageId,
          ...this.notDeletedFilter,
        });

      if (payload.statusId)
        await this.statusRepository.findOne({
          _id: payload.statusId,
          ...this.notDeletedFilter,
        });

      delete payload.contactId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactRepository.findOneAndUpdate(
        { _id: contactId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignContactOwner(payload: AssignContactOwnerDto) {
    try {
      const { contactId } = payload;
      await this.contactRepository.findOne({
        _id: contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        await this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });

      delete payload.contactId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactRepository.findOneAndUpdate(
        { _id: contactId, ...this.notDeletedFilter },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContact(payload: ContactDeleteDto) {
    try {
      const { deletedBy, contactId } = payload;

      await this.contactRepository.findOneAndUpdate(
        { _id: contactId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Deleted Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createContactNote(payload: CreateContactNoteDto) {
    try {
      await this.contactRepository.findOne({
        _id: payload.contactId,
        ...this.notDeletedFilter,
      });

      const res = await this.contactNoteRepository.create(payload);

      delete payload.attachment;
      payload.attachmentId = '651bdf53beeb02bc627d6804';

      return successResponse(
        HttpStatus.CREATED,
        'Contact Note created successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactNote(payload: ContactNoteIdParamDto) {
    try {
      const res = await this.contactNoteRepository.findOne({
        _id: payload.contactNoteId,
        ...this.notDeletedFilter,
      });
      return successResponse(
        HttpStatus.OK,
        'Contact Note Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactNotes(payload: ContactNoteFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      delete payload.page;
      delete payload.limit;

      const filterQuery = {
        ...payload,
        ...this.notDeletedFilter,
      };

      const paginateRes = await this.contactNoteRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Contact Notes Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editContactNote(payload: EditContactNoteDto) {
    try {
      const { contactNoteId } = payload;
      await this.contactNoteRepository.findOne({
        _id: contactNoteId,
        ...this.notDeletedFilter,
      });

      if (payload.contactId)
        await this.contactRepository.findOne({
          _id: payload.contactId,
          ...this.notDeletedFilter,
        });

      delete payload.contactNoteId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactNoteRepository.findOneAndUpdate(
        { _id: contactNoteId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Note Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContactNote(payload: ContactNoteDeleteDto) {
    try {
      const { deletedBy, contactNoteId } = payload;

      await this.contactNoteRepository.findOneAndUpdate(
        { _id: contactNoteId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Note Deleted Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createContactCall(payload: CreateContactCallDto) {
    try {
      await this.contactRepository.findOne({
        _id: payload.contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        await this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });
      for (const assignee of payload.assignee) {
        const userFound = await this.userRepository.find({
          _id: assignee,
          status: 'ACTIVE',
        });
        if (userFound) continue;
        else
          await this.contactRepository.findOne({
            _id: assignee,
            ...this.notDeletedFilter,
          });
      }

      const res = await this.contactCallRepository.create(payload);

      return successResponse(
        HttpStatus.CREATED,
        'Contact Call created successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactCall(payload: ContactCallIdParamDto) {
    try {
      const res = await this.contactCallRepository.findOne({
        _id: payload.contactCallId,
        ...this.notDeletedFilter,
      });
      return successResponse(
        HttpStatus.OK,
        'Contact Call Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactCalls(payload: ContactCallFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      delete payload.page;
      delete payload.limit;

      const filterQuery = {
        ...payload,
        ...this.notDeletedFilter,
      };

      const paginateRes = await this.contactCallRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Contact Calls Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editContactCall(payload: EditContactCallDto) {
    try {
      const { contactCallId } = payload;
      await this.contactCallRepository.findOne({
        _id: contactCallId,
        ...this.notDeletedFilter,
      });

      if (payload.contactId)
        await this.contactRepository.findOne({
          _id: payload.contactId,
        });
      for (const assignee of payload.assignee) {
        const userFound = await this.userRepository.find({
          _id: assignee,
          status: 'ACTIVE',
        });
        if (userFound) continue;
        else
          await this.contactRepository.findOne({
            _id: assignee,
            ...this.notDeletedFilter,
          });
      }
      delete payload.contactCallId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactCallRepository.findOneAndUpdate(
        { _id: contactCallId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Call Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContactCall(payload: ContactCallDeleteDto) {
    try {
      const { deletedBy, contactCallId } = payload;

      await this.contactCallRepository.findOneAndUpdate(
        { _id: contactCallId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Call Deleted Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async rescheduleContactCall(payload: RescheduleContactCallDto) {
    try {
      const { contactCallId } = payload;
      const contactCall = await this.contactCallRepository.findOne({
        _id: contactCallId,
        ...this.notDeletedFilter,
      });

      if (dayjs(payload.startDate).isAfter(dayjs(contactCall.startDate))) {
        const date1 = dayjs(contactCall.startDate);
        const date2 = dayjs(contactCall.endDate);
        const endDateDiff = date1.diff(date2, 'minute'); // 20214000000 default milliseconds

        delete payload.contactCallId;
        const payloadPlan = {
          ...payload,
          endDate: dayjs(payload.startDate).add(endDateDiff, 'minutes'),
          updatedAt: Date.now(),
        };

        const res = await this.contactCallRepository.findOneAndUpdate(
          { _id: contactCallId, ...this.notDeletedFilter },
          payloadPlan
        );
        return successResponse(
          HttpStatus.CREATED,
          'Contact Updated Successfully',
          res
        );
      } else {
        throw new BadRequestException(
          `New Due Date should be greater then previous Due date`
        );
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async resetOutcomeContactCall(payload: ResetOutcomeContactCallDto) {
    try {
      const { contactCallId } = payload;
      await this.contactCallRepository.findOne({
        _id: contactCallId,
        ...this.notDeletedFilter,
      });

      delete payload.contactCallId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactCallRepository.findOneAndUpdate(
        { _id: contactCallId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Call Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactCallsStatus(payload: ContactIdParamDto) {
    try {
      const { contactId } = payload;
      const totalCount = await this.contactCallRepository.count({
        contactId,
        ...this.notDeletedFilter,
      });

      const totalUpcommingCount = await this.contactCallRepository.count({
        startDate: {
          gte: dayjs(),
        },
        contactId,
        ...this.notDeletedFilter,
      });

      const totalCompleteCount = await this.contactCallRepository.count({
        endDate: {
          lte: dayjs(),
        },
        contactId,
        ...this.notDeletedFilter,
      });

      const res = {
        totalCount,
        totalUpcommingCount,
        totalCompleteCount,
      };

      return successResponse(
        HttpStatus.OK,
        'Contact Call Status Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createContactMeeting(payload: CreateContactMeetingDto) {
    try {
      await this.contactRepository.findOne({
        _id: payload.contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });

      for (const assignee of payload.assignee) {
        const userFound = await this.userRepository.find({
          _id: assignee,
          status: 'ACTIVE',
        });
        if (userFound) continue;
        else
          await this.contactRepository.findOne({
            _id: assignee,
            ...this.notDeletedFilter,
          });
      }
      const res = await this.contactMeetingRepository.create(payload);

      return successResponse(
        HttpStatus.CREATED,
        'Contact Meeting created successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactMeeting(payload: ContactMeetingIdParamDto) {
    try {
      const res = await this.contactMeetingRepository.findOne({
        _id: payload.contactMeetingId,
        ...this.notDeletedFilter,
      });
      return successResponse(
        HttpStatus.OK,
        'Contact Meeting Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactMeetings(payload: ContactMeetingFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      delete payload.page;
      delete payload.limit;

      const filterQuery = {
        ...payload,
        ...this.notDeletedFilter,
      };

      const paginateRes = await this.contactMeetingRepository.paginate({
        filterQuery,
        offset: skip,
        limit: take,
      });

      return successResponse(
        HttpStatus.OK,
        'Contact Meetings Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editContactMeeting(payload: EditContactMeetingDto) {
    try {
      const { contactMeetingId } = payload;
      await this.contactMeetingRepository.findOne({
        _id: contactMeetingId,
        ...this.notDeletedFilter,
      });

      if (payload.contactId)
        await this.contactRepository.findOne({
          _id: payload.contactId,
        });

      for (const assignee of payload.assignee) {
        const userFound = await this.userRepository.find({
          _id: assignee,
          status: 'ACTIVE',
        });
        if (userFound) continue;
        else
          await this.contactRepository.findOne({
            _id: assignee,
            ...this.notDeletedFilter,
          });
      }
      delete payload.contactMeetingId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactMeetingRepository.findOneAndUpdate(
        { _id: contactMeetingId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Meeting Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContactMeeting(payload: ContactMeetingDeleteDto) {
    try {
      const { deletedBy, contactMeetingId } = payload;

      await this.contactMeetingRepository.findOneAndUpdate(
        { _id: contactMeetingId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Meeting Deleted Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async rescheduleContactMeeting(payload: RescheduleContactMeetingDto) {
    try {
      const { contactMeetingId } = payload;
      const contactMeeting = await this.contactMeetingRepository.findOne({
        _id: contactMeetingId,
        ...this.notDeletedFilter,
      });

      if (dayjs(payload.startDate).isAfter(dayjs(contactMeeting.startDate))) {
        const date1 = dayjs(contactMeeting.startDate);
        const date2 = dayjs(contactMeeting.endDate);
        const endDateDiff = date1.diff(date2, 'minute'); // 20214000000 default milliseconds

        delete payload.contactMeetingId;
        const payloadPlan = {
          ...payload,
          endDate: dayjs(payload.startDate).add(endDateDiff, 'minutes'),
          updatedAt: Date.now(),
        };

        const res = await this.contactMeetingRepository.findOneAndUpdate(
          { _id: contactMeetingId, ...this.notDeletedFilter },
          payloadPlan
        );
        return successResponse(
          HttpStatus.CREATED,
          'Contact Updated Successfully',
          res
        );
      } else {
        throw new BadRequestException(
          `New Due Date should be greater then previous Due date`
        );
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async resetOutcomeContactMeeting(payload: ResetOutcomeContactMeetingDto) {
    try {
      const { contactMeetingId } = payload;
      await this.contactMeetingRepository.findOne({
        _id: contactMeetingId,
        ...this.notDeletedFilter,
      });

      delete payload.contactMeetingId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactMeetingRepository.findOneAndUpdate(
        { _id: contactMeetingId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Meeting Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactMeetingsStatus(payload: ContactIdParamDto) {
    try {
      const { contactId } = payload;

      const totalCount = await this.contactMeetingRepository.count({
        contactId,
        ...this.notDeletedFilter,
      });

      const totalUpcommingCount = await this.contactMeetingRepository.count({
        startDate: {
          gte: dayjs(),
        },
        contactId,
        ...this.notDeletedFilter,
      });

      const totalCompleteCount = await this.contactMeetingRepository.count({
        endDate: {
          lte: dayjs(),
        },
        contactId,
        ...this.notDeletedFilter,
      });

      const res = {
        totalCount,
        totalUpcommingCount,
        totalCompleteCount,
      };

      return successResponse(
        HttpStatus.OK,
        'Contact Meeting Status Get Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
