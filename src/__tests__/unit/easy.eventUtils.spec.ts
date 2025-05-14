import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('eventUtils', () => {
  /**
   * 1. searchTerm을 기준으로 검색
   * 2. 날짜 기준으로 필터링된 이벤트 목록 반환
   */
  describe('getFilteredEvents', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '팀 회의',
        date: '2025-05-13',
        startTime: '10:00',
        endTime: '11:00',
        description: 'Team 주간 업무 점검',
        location: '회의실 A',
        category: '회의',
        repeat: {
          type: 'none',
          interval: 0,
          endDate: undefined,
        },
        notificationTime: 15,
      },
      {
        id: '2',
        title: '제품 발표',
        date: '2025-05-15',
        startTime: '14:00',
        endTime: '15:00',
        description: '신제품 발표회',
        location: '대회의실',
        category: '발표',
        repeat: {
          type: 'none',
          interval: 0,
          endDate: undefined,
        },
        notificationTime: 30,
      },
      {
        id: '3',
        title: '점심 회식',
        date: '2025-05-15',
        startTime: '12:00',
        endTime: '13:30',
        description: '팀 회식',
        location: '식당',
        category: '회식',
        repeat: {
          type: 'none',
          interval: 0,
          endDate: undefined,
        },
        notificationTime: 15,
      },
      {
        id: '4',
        title: '월간 보고',
        date: '2025-05-30',
        startTime: '10:00',
        endTime: '11:00',
        description: '5월 월간 보고',
        location: '회의실 B',
        category: '보고',
        repeat: {
          type: 'none',
          interval: 0,
          endDate: undefined,
        },
        notificationTime: 20,
      },
      {
        id: '5',
        title: '팀 빌딩',
        date: '2025-06-05',
        startTime: '13:00',
        endTime: '17:00',
        description: '팀 빌딩 활동',
        location: '야외 공간',
        category: '팀 빌딩',
        repeat: {
          type: 'none',
          interval: 0,
          endDate: undefined,
        },
        notificationTime: 60,
      },
    ];

    it('검색어가 없을 때는 해당 뷰에 맞는 모든 이벤트를 반환해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '';
      const view = 'week';

      const result = getFilteredEvents(events, searchTerm, currentDate, view);
      expect(result.map((e) => e.id)).toContain('1');
      expect(result.map((e) => e.id)).toContain('2');
      expect(result.map((e) => e.id)).toContain('3');
    });

    it('월간 뷰에서는 해당 월의 모든 이벤트를 반환해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '';
      const view = 'month';

      const result = getFilteredEvents(events, searchTerm, currentDate, view);
      expect(result.map((e) => e.id)).toContain('1');
      expect(result.map((e) => e.id)).toContain('2');
      expect(result.map((e) => e.id)).toContain('3');
      expect(result.map((e) => e.id)).toContain('4');
      expect(result.map((e) => e.id)).not.toContain('5');
    });

    it('검색어가 제목에 포함된 이벤트만 필터링해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '팀';
      const view = 'month';

      const result = getFilteredEvents(events, searchTerm, currentDate, view);
      expect(result).toHaveLength(2);
      expect(result.map((e) => e.id)).toContain('1');
      expect(result.map((e) => e.id)).toContain('3');
    });

    it('검색어가 설명에 포함된 이벤트만 필터링해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '보고';
      const view = 'month';
      expect(getFilteredEvents(events, searchTerm, currentDate, view)[0].id).toBe('4');
    });

    it('검색어가 위치에 포함된 이벤트만 필터링해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '회의실';
      const view = 'month';

      const result = getFilteredEvents(events, searchTerm, currentDate, view);
      expect(result.map((e) => e.id)).toContain('1');
      expect(result.map((e) => e.id)).toContain('2');
      expect(result.map((e) => e.id)).toContain('4');
    });

    it('검색어 대소문자를 구분하지 않고 필터링해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = 'team';
      const view = 'month';
      expect(getFilteredEvents(events, searchTerm, currentDate, view)).toHaveLength(1);
    });

    it('검색어와 날짜 필터가 모두 적용되어야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '회의';
      const view = 'week';
      expect(getFilteredEvents(events, searchTerm, currentDate, view)).toHaveLength(2);
    });

    it('해당 범위에 이벤트가 없으면 빈 배열을 반환해야 한다', () => {
      const currentDate = new Date(2025, 3, 1);
      const searchTerm = '';
      const view = 'week';
      expect(getFilteredEvents(events, searchTerm, currentDate, view)).toEqual([]);
    });

    it('검색어에 맞는 이벤트가 없으면 빈 배열을 반환해야 한다', () => {
      const currentDate = new Date(2025, 4, 15);
      const searchTerm = '존재하지않는검색어';
      const view = 'month';
      expect(getFilteredEvents(events, searchTerm, currentDate, view)).toEqual([]);
    });
  });
});
