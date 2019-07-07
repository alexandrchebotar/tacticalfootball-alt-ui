import React from 'react';

const CombinedSkill = ({value: {current, potential, train, age, hideSkills}}) => {
  const getDenomClassName = (value) => { return (value < 20) ?
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
  const getValue = (hideSkills, value) => {
    if (hideSkills) {
      let newValue = '';
      switch (value) {
        case 10:
          newValue = '0+';
          break;
        case 15:
          newValue = '15+';
          break;
        case 20:
          newValue = '20+';
          break;
        case 25:
          newValue = '25+';
          break;
        case 30:
          newValue = '30+';
          break;
        case 35:
          newValue = '35+';
          break;
        case 40:
          newValue = '40+';
          break;
        case 45:
          newValue = '45+';
          break;
        case 50:
          newValue = '50+';
          break;
        case 55:
          newValue = '55+';
          break;
        case 60:
          newValue = '60+';
          break;
        case 65:
          newValue = '65+';
          break;
        case 70:
          newValue = '70+';
          break;
        case 75:
          newValue = '75+';
          break;
        case 80:
          newValue = '80+';
          break;
        case 85:
          newValue = '85+';
          break;
        case 90:
          newValue = '90+';
          break;
        case 95:
          newValue = '95+';
          break;
        default:
          break;
      }
      return newValue;
    } else {
      return value;
    }
  };
  return (
    <div className={train ? 'skill-training' : ''}>
      <span className={'skill-current ' + getDenomClassName(current)}>{getValue(hideSkills, current)}</span>
      <span className={'skill-potential ' + getDenomClassName(potential)}>{getValue(hideSkills, potential)}</span>
      <span className={age < 0 ? 'skill-age skill-age-negative' : 'skill-age'}>{age}</span>
    </div>
  );
};

export default CombinedSkill;
