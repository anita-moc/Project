# Life Cycle Diagram

The following diagram shows the life cycle of a medical appointment in the system. The life cycle begins with the creation of a scheduled appointment and ends with the completion of the appointment. The diagram shows the different statuses that an appointment can go through and the transitions between these statuses.

```mermaid
stateDiagram-v2
    [*] --> SCHEDULED: Schedule appointment
    SCHEDULED --> CONFIRMED: Doctor confirms appointment
    SCHEDULED --> CANCELLED: Doctor or Patient cancels appointment
    CONFIRMED --> PAYED: Patient makes payment
    CONFIRMED --> CANCELLED: Patient or Doctor cancels appointment
    PAYED --> READY: Appointment ready to begin
    PAYED --> CANCELLED: Patient or Doctor cancels appointment (refund)
    READY --> STARTED: Appointment begins
    READY --> MISSED: Patient no-show
    STARTED --> FINISHED: Appointment finished
    STARTED --> CANCELLED: Appointment cancelled during consultation
    FINISHED --> [*]: Appointment completed
    CANCELLED --> [*]: Appointment cancelled
    CANCELLED --> SCHEDULED: Patient reschedules appointment
    MISSED --> [*]: Appointment missed
    MISSED --> SCHEDULED: Patient reschedules appointment
```
