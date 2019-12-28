import {ucFirst} from "../utils/utils";

const pointTypes = [
  {
    name: `taxi`,
    group: `transfer`,
  },
  {
    name: `bus`,
    group: `transfer`,
  },
  {
    name: `train`,
    group: `transfer`,
  },
  {
    name: `ship`,
    group: `transfer`,
  },
  {
    name: `transport`,
    group: `transfer`,
  },
  {
    name: `drive`,
    group: `transfer`,
  },
  {
    name: `flight`,
    group: `transfer`,
  },
  {
    name: `check-in`,
    group: `activity`,
  },
  {
    name: `sightseeing`,
    group: `activity`,
  },
  {
    name: `restaurant`,
    group: `activity`,
  },
];

export const createPointTypesList = () => {
  const createPointTypesItem = (types, group) => {
    return types
      .filter((type) => type.group === group)
      .map((type) => {
        return (`
        <div class="event__type-item">
          <input id="event-type-${type.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${type.name}>
          <label class="event__type-label  event__type-label--${type.name}" for="event-type-${type.name}-1">${ucFirst(type.name)}</label>
        </div>
        `);
      })
      .join(`\n`);
  };

  return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${createPointTypesItem(pointTypes, `transfer`)}
      </fieldset>
  
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
         ${createPointTypesItem(pointTypes, `activity`)}
      </fieldset>
    </div>
  `);
};
