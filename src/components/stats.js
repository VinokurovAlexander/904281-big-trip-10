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

const renderMoneyChart = (moneyCtx, points) => {
  // const data = {};
  // points.forEach((point) => {
  //   data[point.type.name] = point.price;
  // });
  //
  // console.log(data);
  const data = [];
  points.forEach((point) => )

  const dataLabels = Object.keys(data).map((pointName) => getLabel(pointName.toUpperCase()));

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataLabels,
      datasets: [{
        data: Object.values(data),
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
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `MONEY`,
        fontSize: 24,
        fontColor: `#000000`,
        position: `left`
      },
      plugins: {
        datalabels: {
          anchor: `end`,
          align: `start`,
          formatter: (value) => `€ ` + value
        }
      }
    },
  });
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

  const dataLabels = Object.keys(data).map((pointName) => getLabel(pointName.toUpperCase()));

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataLabels,
      datasets: [{
        data: Object.values(data),
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
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontSize: 24,
        fontColor: `#000000`,
        position: `left`
      },
      plugins: {
        datalabels: {
          anchor: `end`,
          align: `start`,
          formatter: (value) => value + `x`
        }
      }
    },
  });
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

  Object.keys(data).map((key) => data[key] = Math.floor(data[key] / 60));
  const dataLabels = Object.keys(data).map((pointName) => getLabel(pointName.toUpperCase()));

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataLabels,
      datasets: [{
        data: Object.values(data),
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
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontSize: 24,
        fontColor: `#000000`,
        position: `left`
      },
      plugins: {
        datalabels: {
          anchor: `end`,
          align: `start`,
          formatter: (value) => value + `H`
        }
      }
    },
  });
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
