import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private queue = [];

  getQueue() {
    return this.queue;
  }

  addPatient(patientName: string) {
    const queueNumber = this.queue.length + 1;
    this.queue.push({ queueNumber, patientName, status: 'Waiting' });
    return { queueNumber };
  }

  updateStatus(queueNumber: number, status: string) {
    const patient = this.queue.find(q => q.queueNumber === queueNumber);
    if (patient) patient.status = status;
    return patient;
  }
}

