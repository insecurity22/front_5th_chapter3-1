import { Event } from '../../types';
import {
  fillZero,
  formatDate,
  formatMonth,
  formatWeek,
  getDaysInMonth,
  getEventsForDay,
  getWeekDates,
  getWeeksAtMonth,
  isDateInRange,
} from '../../utils/dateUtils';

describe('dateUtils', () => {
  /**
   * @description 주어진 년도와 월의 일수를 반환합니다.
   */
  describe('getDaysInMonth', () => {
    it('2월은 평년에 28일까지 있어야 한다', () => {
      expect(getDaysInMonth(2025, 2)).toBe(28);
    });

    it('2월은 윤년에 29일까지 있어야 한다', () => {
      expect(getDaysInMonth(2024, 2)).toBe(29);
    });

    it('4월은 30일까지 있어야 한다', () => {
      expect(getDaysInMonth(2025, 4)).toBe(30);
    });

    it('5월은 31일까지 있어야 한다', () => {
      expect(getDaysInMonth(2025, 5)).toBe(31);
    });
  });

  /**
   * @description 주어진 날짜가 속한 주의 모든 날짜를 반환합니다.
   */
  describe('getWeekDates', () => {
    /**
     * 해당 주간의 일요일부터 토요일까지 날짜를 반환합니다.
     */
    it('주어진 날짜의 주간 날짜(일요일부터 토요일까지)를 반환해야 한다', () => {
      const date = new Date(2025, 4, 15);
      const weekDates = getWeekDates(date);

      const WEEK_LENGTH = 7;
      const EXPECTED_MONTH = 4;
      const EXPECTED_SUNDAY_DATE = 11;

      expect(weekDates).toHaveLength(WEEK_LENGTH);

      weekDates.forEach((currentDate, currentDateIndex) => {
        const expectedDateOfWeek = EXPECTED_SUNDAY_DATE + currentDateIndex;
        expect(currentDate.getDate()).toBe(expectedDateOfWeek);
        expect(currentDate.getMonth()).toBe(EXPECTED_MONTH);
      });
    });

    /**
     * 월의 끝인 2025. 5. 31 토요일의 경우에도
     * 일요일부터 토요일까지 일주일 날짜를 반환해야 한다.
     */
    it('주가 월을 넘어가는 경우도 정확히 계산해야 한다', () => {
      const date = new Date(2025, 4, 31);
      const weekDates = getWeekDates(date);

      expect(weekDates[0].getDate()).toBe(25);
      expect(weekDates[1].getDate()).toBe(26);
      expect(weekDates[2].getDate()).toBe(27);
      expect(weekDates[3].getDate()).toBe(28);
      expect(weekDates[4].getDate()).toBe(29);
      expect(weekDates[5].getDate()).toBe(30);
      expect(weekDates[6].getDate()).toBe(31);
    });
  });

  /**
   * @description 주어진 날짜가 속한 월의 모든 주간 배열을 반환합니다.
   */
  describe('getWeeksAtMonth', () => {
    it('2025년 5월의 주간 배열을 정확히 반환해야 한다', () => {
      const date = new Date(2025, 4, 1);
      const weeks = getWeeksAtMonth(date);
      expect(weeks).toMatchObject([
        [null, null, null, null, 1, 2, 3],
        [4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 31],
      ]);
    });

    it('2025년 6월의 주간 배열을 정확히 반환해야 한다', () => {
      const date = new Date(2025, 5, 1);
      const weeks = getWeeksAtMonth(date);
      expect(weeks).toMatchObject([
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, null, null, null, null, null],
      ]);
    });
  });

  describe('getEventsForDay', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2025-05-15',
        startTime: '10:00',
        endTime: '11:00',
        description: '설명 1',
        location: '위치 1',
        category: '카테고리 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      },
      {
        id: '2',
        title: '이벤트 2',
        date: '2025-05-15',
        startTime: '14:00',
        endTime: '15:00',
        description: '설명 2',
        location: '위치 2',
        category: '카테고리 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      },
      {
        id: '3',
        title: '이벤트 3',
        date: '2025-05-16',
        startTime: '10:00',
        endTime: '11:00',
        description: '설명 3',
        location: '위치 3',
        category: '카테고리 3',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 15,
      },
    ];

    it('특정 날짜에 해당하는 이벤트만 반환해야 한다', () => {
      const day = 15;
      const result = getEventsForDay(events, day);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });

    it('해당 날짜에 이벤트가 없으면 빈 배열을 반환해야 한다', () => {
      const day = 10;
      expect(getEventsForDay(events, day)).toEqual([]);
    });
  });

  describe('formatWeek', () => {
    it('2025년 5월 15일은 "2025년 5월 3주"로 포맷팅되어야 한다', () => {
      const date = new Date(2025, 4, 15);
      expect(formatWeek(date)).toBe('2025년 5월 3주');
    });

    it('2025년 6월 5일은 "2025년 6월 1주"로 포맷팅되어야 한다', () => {
      const date = new Date(2025, 5, 5);
      expect(formatWeek(date)).toBe('2025년 6월 1주');
    });
  });

  describe('formatMonth', () => {
    it('2025년 5월은 "2025년 5월"로 포맷팅되어야 한다', () => {
      const date = new Date(2025, 4, 15);
      expect(formatMonth(date)).toBe('2025년 5월');
    });

    it('2025년 12월은 "2025년 12월"로 포맷팅되어야 한다', () => {
      const date = new Date(2025, 11, 25);
      expect(formatMonth(date)).toBe('2025년 12월');
    });
  });

  describe('isDateInRange', () => {
    it('범위 내의 날짜는 true를 반환해야 한다', () => {
      const date = new Date(2025, 4, 15);
      const rangeEnd = new Date(2025, 4, 20);
      const rangeStart = new Date(2025, 4, 10);
      expect(isDateInRange(date, rangeStart, rangeEnd)).toBe(true);
    });

    it('범위 경계에 있는 날짜도 true를 반환해야 한다', () => {
      const date = new Date(2025, 4, 10);
      const rangeEnd = new Date(2025, 4, 20);
      const rangeStart = new Date(2025, 4, 10);
      expect(isDateInRange(date, rangeStart, rangeEnd)).toBe(true);
    });

    it('범위 밖의 날짜는 false를 반환해야 한다', () => {
      const date = new Date(2025, 4, 5);
      const rangeEnd = new Date(2025, 4, 20);
      const rangeStart = new Date(2025, 4, 10);
      expect(isDateInRange(date, rangeStart, rangeEnd)).toBe(false);
    });
  });

  describe('fillZero', () => {
    it('한 자리 숫자는 앞에 0이 채워져야 한다', () => {
      expect(fillZero(5)).toBe('05');
    });

    it('두 자리 숫자는 그대로 반환되어야 한다', () => {
      expect(fillZero(15)).toBe('15');
    });

    it('크기를 3으로 지정하면 세 자리로 채워져야 한다', () => {
      const size = 3;
      const value = 5;
      expect(fillZero(value, size)).toBe('005');
    });
  });

  describe('formatDate', () => {
    it('날짜가 YYYY-MM-DD 형식으로 포맷팅되어야 한다', () => {
      const date = new Date(2025, 4, 15);
      expect(formatDate(date)).toBe('2025-05-15');
    });

    it('day 매개변수를 제공하면 해당 일자로 포맷팅되어야 한다', () => {
      const day = 20;
      const date = new Date(2025, 4, 15);
      expect(formatDate(date, day)).toBe('2025-05-20');
    });
  });
});
