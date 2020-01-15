import AbstractComponent from "./abstract-components";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {pointTypes} from "../mock/event";
import moment from "moment";

const createStatsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900" height="300"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900" height="300"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900" height="300"></canvas>
    </div>
  </section>`
);

const getLabel = (pointName) => {
  if (pointName === `CHECK-IN`) {
    pointName = `CHECKIN`;
  }

  return `${String.fromCodePoint(pointTypes[pointName].emoji)}${pointName} `;
};

const getSortData = (data) => {
  const sortData = {
    labels: [],
    values: []
  };

  Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .map((it) => {
      const type = it[0];
      const value = it[1];
      sortData.labels.push(getLabel(type));
      sortData.values.push(value);
    });

  return sortData;
};

const getChart = (Ctx, sortData, title, formatCb) => {
  return new Chart(Ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: sortData.labels,
      datasets: [{
        data: sortData.values,
        backgroundColor: `white`
      }]
    },
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false,
            beginAtZero: true,
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        fontSize: 24,
        fontColor: `#000000`,
        position: `left`
      },
      plugins: {
        datalabels: {
          anchor: `end`,
          align: `start`,
          formatter: formatCb
        }
      },
      layout: {
        padding: {
          left: 100
        }
      }
    },
  });
};

const renderMoneyChart = (moneyCtx, points) => {
  const data = {};
  points.forEach((point) => {
    const pointType = point.type.name;
    const pointPrice = point.price;
    if (data[pointType]) {
      data[pointType] += pointPrice;
    } else {
      data[pointType] = pointPrice;
    }
  });

  const sortData = getSortData(data);
  const setDatalabelsViewFormat = (value) => `€ ` + value;

  return getChart(moneyCtx, sortData, `MONEY`, setDatalabelsViewFormat);
};

const renderTransportChart = (transportCtx, points) => {
  const data = {};
  points.map((point) => {
    const pointType = point.type.name;
    if (data[pointType]) {
      data[pointType]++;
    } else {
      data[pointType] = 1;
    }
  });

  const sortData = getSortData(data);
  const setDatalabelsViewFormat = (value) => value + `x`;

  return getChart(transportCtx, sortData, `TRANSPORT`, setDatalabelsViewFormat);
};

const renderTimeChart = (timeCtx, points) => {
  const data = {};
  points.map((point) => {
    const startTime = point.calendar.start;
    const endTime = point.calendar.end;
    const minutesDuration = moment(endTime).diff(moment(startTime), `minutes`);
    const pointType = point.type.name;

    if (data[pointType]) {
      data[pointType] += minutesDuration;
    } else {
      data[pointType] = minutesDuration;
    }
  });

  const sortData = getSortData(data);
  sortData.values = sortData.values.map((time) => Math.floor(time / 60));

  const setDatalabelsViewFormat = (value) => value + `H`;

  return getChart(timeCtx, sortData, `TIME SPENT`, setDatalabelsViewFormat);
};

export default class Stats extends AbstractComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
    this._renderCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _renderCharts() {
    const element = this.getElement();
    const points = this._pointsModel.getPoints();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    renderMoneyChart(moneyCtx, points);

    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    renderTransportChart(transportCtx, points);

    const timeCtx = element.querySelector(`.statistics__chart--time`);
    renderTimeChart(timeCtx, points);
  }
}
