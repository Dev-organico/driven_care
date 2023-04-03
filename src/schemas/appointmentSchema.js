import joi from 'joi';
import JoiDate from '@joi/date';

const JoiExtended = joi.extend(JoiDate);

export const appointmentSchema = joi.object({
  medic_id: joi.number().required(),
  date: JoiExtended.date().format('DD-MM-YY').utc().required(),
  start_time: JoiExtended.date().format('HH-mm').required()
});