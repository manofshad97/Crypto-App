import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import * as usertz from 'user-timezone'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
Chart.register(CategoryScale)

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price)
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      usertz.datetime(
        coinHistory?.data?.history[i].timestamp,
        timePeriod === '3h' || timePeriod === '24h'
          ? 'h:mm A'
          : timePeriod === '1y' || timePeriod === '3y' || timePeriod === '5y'
          ? 'MM-DD-YYYY'
          : 'MM-DD',
      ),
    )
  }

  coinTimestamp.reverse()
  coinPrice.reverse()

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In $US',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart{' '}
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
