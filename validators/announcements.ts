import Joi from "joi";
import { IAnnouncement } from "@/types";

export const createAnnouncementSchema = async (
  createAnnouncementBody: IAnnouncement
): Promise<IAnnouncement> => {
  const schema = Joi.object({
    title: Joi.string().required(),
    details: Joi.string().required(),
  });

  return await schema.validateAsync(createAnnouncementBody);
};

export const updateAnnouncementSchema = async (
  updateAnnouncementBody: IAnnouncement
): Promise<IAnnouncement> => {
  const schema = Joi.object({
    title: Joi.string(),
    details: Joi.string(),
  });

  return await schema.validateAsync(updateAnnouncementBody);
};
