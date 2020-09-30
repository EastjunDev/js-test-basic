describe('toBe / toEqual', () => {
  it('원시 타입인 경우 toBe/toEqual 모두 값 비교를 한다', () => {
    expect(true).toBe(true);
    expect(true).toEqual(true);
    expect(1 + 2).toBe(3);
    expect(1 + 2).toEqual(3);
    expect('3').not.toBe(3);
    expect('3').not.toEqual(3);
  });

  describe('객체인 경우', () => {
    const artist1 = {
      name: {
        first: 'Michael',
        last: 'Jackson',
      },
      songs: ['Beat It', 'Man in the Mirror'],
    };

    const artist2 = {
      name: {
        first: 'Michael',
        last: 'Jackson',
      },
      songs: ['Beat It', 'Man in the Mirror'],
    };

    it('객체인 경우 toBe는 참조 비교를 한다.', () => {
      expect(artist1).toBe(artist1);
      expect(artist1).not.toBe(artist2);
    });

    it('객체인 경우 toEqual은 값 비교를 한다.', () => {
      expect(artist1).toEqual(artist2);
    });
  });
});

describe('Math.round()', () => {
  it('소숫점 이하 값이 0.5 이상이면 올림 값을 반환한다', () => {
    expect(Math.round(123.6) === 124).toEqual(true);
    expect(Math.round(254.54812948912843) === 255).toEqual(true);
    expect(Math.round(5844.499999999999) === 5845).toEqual(false);
    expect(Math.round(21.844) === 22).toEqual(true);
    expect(Math.round(65535.23912938238) === 65536).toEqual(false);
    expect(Math.round(16.383) === 17).toEqual(false);
    expect(Math.round(4294967292.0987654321) === 4294967293).toEqual(false);
    expect(Math.round(16777213.8758467456) === 16777214).toEqual(true);
    expect(Math.round(1234567890.5) === 1234567891).toEqual(true);
  });

  it('소숫점 이하 값이 0.5 미만이면 내림 값을 반환한다', () => {
    expect(Math.round(5844.499999999999) === 5844).toEqual(true);
    expect(Math.round(1234567890.5) === 1234567890).toEqual(false);
    expect(Math.round(65535.23912938238) === 65535).toEqual(true);
    expect(Math.round(16.383) === 16).toEqual(true);
    expect(Math.round(16777213.8758467456) === 16777213).toEqual(false);
    expect(Math.round(4294967292.0987654321) === 4294967292).toEqual(true);
  });
});

describe('Array.prototype.slice()', () => {
  const nums = [1, 2, 3, 4, 5];

  it('인자가 없으면 전체 배열을 복사해서 그대로 반환한다.', () => {
    expect(nums.slice()).toEqual(nums);
  });

  it('인자가 하나이면, 주어진 인덱스부터 마지막 인덱스까지의 배열을 반환한다.', () => {
    expect(nums.slice(2)).toEqual([3, 4, 5]);
    expect(nums.slice(0)).toEqual([1, 2, 3, 4, 5]);
    expect(nums.slice(1)).toEqual([2, 3, 4, 5]);
  });

  it('인자가 두 개이면, 인덱스가 첫 번째 인자와 두 번째 인자 사이에 해당하는 배열을 반환한다.', () => {
    expect(nums.slice(1, 3)).toEqual([2, 3]);
    expect(nums.slice(4, 5)).toEqual([5]);
    expect(nums.slice(3, 5)).toEqual([4, 5]);
  });

  it('반환되는 배열은 기존 배열과 다른 새로운 배열이다.', () => {
    expect(nums).toBe(nums);
    expect(nums.slice()).not.toBe(nums);
    expect(nums.slice(1, 3)).not.toBe([2, 3]);
    expect(nums.slice(3, 5)).not.toBe(nums.slice(3, 5));
  });
});
