import { Event } from '../types';

const 초 = 1000;
const 분 = 초 * 60;

export function getUpcomingEvents(events: Event[], now: Date, notifiedEvents: string[]) {
  return events.filter((event) => {
    const eventStart = new Date(`${event.date}T${event.startTime}`);
    const timeDiff = (eventStart.getTime() - now.getTime()) / 분;

    const isFutureEvent = timeDiff > 0;
    const isWithoutNotificationPeriod = timeDiff <= event.notificationTime;
    const isAlreadyNotified = notifiedEvents.includes(event.id);

    return isFutureEvent && isWithoutNotificationPeriod && !isAlreadyNotified;
  });
}

export function createNotificationMessage({ notificationTime, title }: Event) {
  return `${notificationTime}분 후 ${title} 일정이 시작됩니다.`;
}
