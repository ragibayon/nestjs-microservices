import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { ReservationDocument } from './models/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);
  // protected readonly logger = new Logger('ReservationRepository');

  constructor(
    @InjectModel('reservation')
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
