import React from 'react';

const CombinedSkill = ({value: {current, potential, train, age}}) => {
  const getDenomClassName = (value) => { return (value < 15) ?
      'denom1' :
      (value < 30) ?
        'denom2':
        (value < 40) ?
          'denom3':
          (value < 50) ?
            'denom4':
            (value < 60) ?
              'denom5':
              (value < 70) ?
                'denom6':
                (value < 80) ?
                  'denom7':
                  (value < 90) ?
                    'denom8':
                    'denom9';
  }
  return (
    <div className={train ? 'skill-training' : ''}>
      <span className={'skill-current ' + getDenomClassName(current)}>{current}</span>
      <span className={'skill-potential ' + getDenomClassName(potential)}>{potential}</span>
      <span className={age < 0 ? 'skill-age skill-age-negative' : 'skill-age'}>{age}</span>
    </div>
  );
};

export default CombinedSkill;
