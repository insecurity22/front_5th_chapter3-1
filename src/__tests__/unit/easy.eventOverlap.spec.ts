import { Event, EventForm } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('eventOverlap', () => {
  /**
   * @description 날짜와 시간을 Date 객체로 변환합니다.
   */
  describe('parseDateTime', () => {
    it('날짜와 시간을 Date 객체로 변환해야 한다', () => {
      const date = '2025-05-15';
      const time = '10:30';
      expect(parseDateTime(date, time)).toEqual(new Date('2025-05-15T10:30'));
    });

    it('시간이 자정(00:00)인 경우도 정확히 변환해야 한다', () => {
      const date = '2025-05-15';
      const time = '00:00';
      expect(parseDateTime(date, time)).toEqual(new Date('2025-05-15T00:00'));
    });

    it('시간이 정오(12:00)인 경우도 정확히 변환해야 한다', () => {
      const date = '2025-05-15';
      const time = '12:00';
      expect(parseDateTime(date, time)).toEqual(new Date('2025-05-15T12:00'));
    });
  });

  /**
   * @description 이벤트를 시작 시간과 종료 시간을 가진 객체로 변환합니다.
   */
  describe('convertEventToDateRange', () => {
    let event: EventForm;
    beforeEach(() => {
      event = {
        title: '회의',
        date: '2025-05-15',
        startTime: '10:00',
        endTime: '11:00',
        description: '팀 회의',
        location: '회의실 1',
        category: '회의',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };
    });

    it('이벤트를 시작 시간과 종료 시간을 가진 객체로 변환해야 한다', () => {
      expect(convertEventToDateRange(event)).toEqual({
        start: new Date('2025-05-15T10:00'),
        end: new Date('2025-05-15T11:00'),
      });
    });

    it('Event 타입도 동일하게 처리해야 한다', () => {
      expect(convertEventToDateRange(event)).toEqual({
        start: new Date('2025-05-15T10:00'),
        end: new Date('2025-05-15T11:00'),
      });
    });
  });

  describe('isOverlapping', () => {
    let event1: EventForm;
    beforeEach(() => {
      event1 = {
        title: '회의 1',
        description: '팀 회의 1',
        date: '2025-05-15',
        endTime: '11:00',
        startTime: '10:00',
        category: '회의',
        location: '회의실 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };
    });

    it('두 이벤트가 겹치는 경우 true를 반환해야 한다', () => {
      const event2: EventForm = {
        title: '회의 2',
        description: '팀 회의 2',
        date: '2025-05-15',
        endTime: '11:30',
        startTime: '10:30',
        category: '회의',
        location: '회의실 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(isOverlapping(event1, event2)).toBeTruthy();
    });

    it('두 이벤트가 겹치지 않는 경우 false를 반환해야 한다', () => {
      const event2: EventForm = {
        title: '회의 2',
        description: '팀 회의 2',
        date: '2025-05-15',
        endTime: '12:00',
        startTime: '11:00',
        category: '회의',
        location: '회의실 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(isOverlapping(event1, event2)).toBeFalsy();
    });

    it('한 이벤트가 다른 이벤트에 완전히 포함되는 경우 true를 반환해야 한다', () => {
      const event2: EventForm = {
        title: '회의 2',
        description: '팀 회의 2',
        date: '2025-05-15',
        endTime: '10:45',
        startTime: '10:15',
        category: '회의',
        location: '회의실 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(isOverlapping(event1, event2)).toBeTruthy();
    });

    it('다른 날짜의 이벤트는 겹치지 않아야 한다', () => {
      const event2: EventForm = {
        title: '회의 2',
        description: '팀 회의 2',
        date: '2025-05-16',
        endTime: '11:00',
        startTime: '10:00',
        category: '회의',
        location: '회의실 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(isOverlapping(event1, event2)).toBeFalsy();
    });
  });

  /**
   * @description 새 이벤트와 겹치는 이벤트 목록을 반환합니다.
   */
  describe('findOverlappingEvents', () => {
    let events: Event[];

    beforeEach(() => {
      events = [
        {
          id: '1',
          title: '회의 1',
          description: '팀 회의 1',
          date: '2025-05-15',
          endTime: '10:00',
          startTime: '09:00',
          category: '회의',
          location: '회의실 1',
          repeat: { type: 'none', interval: 0 },
          notificationTime: 15,
        },
        {
          id: '2',
          title: '회의 2',
          description: '팀 회의 2',
          date: '2025-05-15',
          endTime: '11:00',
          startTime: '10:00',
          category: '회의',
          location: '회의실 2',
          repeat: { type: 'none', interval: 0 },
          notificationTime: 15,
        },
        {
          id: '3',
          title: '회의 3',
          description: '팀 회의 3',
          date: '2025-05-15',
          endTime: '12:00',
          startTime: '11:00',
          category: '회의',
          location: '회의실 3',
          repeat: { type: 'none', interval: 0 },
          notificationTime: 15,
        },
        {
          id: '4',
          title: '회의 4',
          description: '팀 회의 4',
          date: '2025-05-16',
          endTime: '11:00',
          startTime: '10:00',
          category: '회의',
          location: '회의실 4',
          repeat: { type: 'none', interval: 0 },
          notificationTime: 15,
        },
      ];
    });

    it('새 이벤트와 겹치는 이벤트 목록을 반환해야 한다', () => {
      const newEvent: EventForm = {
        title: '새 회의',
        description: '새 팀 회의',
        date: '2025-05-15',
        endTime: '10:30',
        startTime: '09:30',
        category: '회의',
        location: '회의실',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(findOverlappingEvents(newEvent, events).map((event) => event.id)).toEqual(['1', '2']);
    });

    it('겹치는 이벤트가 없으면 빈 배열을 반환해야 한다', () => {
      const newEvent: EventForm = {
        title: '새 회의',
        description: '새 팀 회의',
        date: '2025-05-15',
        endTime: '13:00',
        startTime: '12:00',
        category: '회의',
        location: '회의실',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      expect(findOverlappingEvents(newEvent, events)).toEqual([]);
    });

    it('이벤트 수정 시 자기 자신과는 겹침으로 간주하지 않아야 한다', () => {
      const myEvent = events[1];
      const editedEvent: Event = {
        ...myEvent,
        title: '수정된 회의',
        description: '수정된 팀 회의',
        endTime: '11:30',
      };

      const overlappingEvents = findOverlappingEvents(editedEvent, events);

      // 시간이 겹치는 이벤트만 반환해야 한다 (ID '3')
      expect(overlappingEvents.map((event) => event.id)).toEqual(['3']);

      // 겹치는 이벤트가 있는 경우 자기 자신과는 겹침으로 간주하지 않아야 한다
      expect(overlappingEvents.some((event) => event.id !== myEvent.id)).toBeTruthy();
    });
  });
});
