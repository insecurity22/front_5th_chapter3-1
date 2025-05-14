import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('notificationUtils', () => {
  /**
   * @description 곧 시작할 알림 이벤트를 반환해야 한다.
   * - 시작시간 10:00, 알림 시간 15분 이내
   * - 시작시간 11:00, 알림 시간 30분 이내
   * - 시작시간 13:00, 알림 시간 60분 이내
   */
  describe('getUpcomingEvents', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '회의 1',
        date: '2025-05-15',
        startTime: '10:00',
        endTime: '11:00',
        description: '회의 설명 1',
        location: '회의실 1',
        category: '회의',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      },
      {
        id: '2',
        title: '회의 2',
        date: '2025-05-15',
        startTime: '11:00',
        endTime: '12:00',
        description: '회의 설명 2',
        location: '회의실 2',
        category: '회의',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      },
      {
        id: '3',
        title: '회의 3',
        date: '2025-05-15',
        startTime: '13:00',
        endTime: '14:00',
        description: '회의 설명 3',
        location: '회의실 3',
        category: '회의',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 60,
      },
    ];

    /**
     * @description 13:00에 시작되는 이벤트는 일정이 시작되기 60분 이내에 알림을 보내야 한다.
     */
    it('곧 시작할 이벤트를 반환해야 한다', () => {
      const now = new Date('2025-05-15T12:59:00');
      const notifiedEvents: string[] = [];
      expect(getUpcomingEvents(events, now, notifiedEvents)[0].id).toBe('3');
    });

    /**
     * @description 알림 범위
     * - 아직 시작 안했고
     * - 알림 시간 내에 있으며
     * - 이미 알림을 보낸 이벤트는 제외
     */
    it('알림 범위에 있는 모든 이벤트를 반환해야 한다', () => {
      const now = new Date('2025-05-15T12:59:00');
      const notifiedEvents: string[] = [];
      expect(getUpcomingEvents(events, now, notifiedEvents)[0].id).toBe('3');
    });

    it('이미 알림을 보낸 이벤트는 제외해야 한다', () => {
      const now = new Date('2025-05-15T12:59:00');
      const notifiedEvents: string[] = ['1', '2'];
      expect(getUpcomingEvents(events, now, notifiedEvents)[0].id).toBe('3');
    });

    it('알림 시간이 지난 이벤트는 제외해야 한다', () => {
      const now = new Date('2025-05-15T13:01:00');
      const notifiedEvents: string[] = [];
      expect(getUpcomingEvents(events, now, notifiedEvents)).toHaveLength(0);
    });

    it('알림 시간이 너무 이른 이벤트는 제외해야 한다', () => {
      const now = new Date('2025-05-15T10:00:00');
      const notifiedEvents: string[] = [];
      expect(getUpcomingEvents(events, now, notifiedEvents)).toHaveLength(0);
    });
  });

  describe('createNotificationMessage', () => {
    it('알림 메시지를 올바르게 생성해야 한다', () => {
      const event: Event = {
        id: '1',
        title: '중요 회의',
        date: '2025-05-15',
        startTime: '10:00',
        endTime: '11:00',
        description: '회의 설명',
        location: '회의실',
        category: '회의',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      };

      const message = createNotificationMessage(event);
      expect(message).toBe('15분 후 중요 회의 일정이 시작됩니다.');
    });

    it('다른 알림 시간과 제목으로도 올바르게 메시지를 생성해야 한다', () => {
      const event: Event = {
        id: '2',
        title: '팀 미팅',
        date: '2025-05-15',
        startTime: '14:00',
        endTime: '15:00',
        description: '미팅 설명',
        location: '회의실',
        category: '미팅',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 30,
      };

      const message = createNotificationMessage(event);
      expect(message).toBe('30분 후 팀 미팅 일정이 시작됩니다.');
    });
  });
});
