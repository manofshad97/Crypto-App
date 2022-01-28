import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import '../Cryptocurrencies.css'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  //change the number of cryptocurrencies displayed based on whether they have the simplified variable
  const count = simplified ? 10 : 100
  //Use the full crypto data that was fetched and put it in cryptosList. Create isFetching variable
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  //Nest into the coins part of the data and make that cryptos
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  //If the data is being fetched return loading string
  if (isFetching) return <Loader />

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Container that holds all crypto cards using Row component */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {/* If cryptos exists, loop through it and for each currency display a card(begins with Col) which contains various details of the currency  */}
        {cryptos?.map((currency) =>
          /*Condotions for giving the daily change no specified color  */
          millify(currency.change) === '-0' ||
          millify(currency.change) === '0' ? (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              {/* Note: Change currency.id to currency.uuid  */}
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>
                    Price: $
                    {/*Decimal precision based on the price of the cryptocurrency */}
                    {currency.price < 0.01 && currency.price > 0.001
                      ? millify(currency.price, { precision: 4 })
                      : currency.price < 0.001
                      ? millify(currency.price, { precision: 5 })
                      : currency.price < 1000
                      ? millify(currency.price, { precision: 2 })
                      : millify(currency.price)}
                  </p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: 0%</p>
                </Card>
              </Link>
            </Col>
          ) : (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt="icon"
                    />
                  }
                  hoverable
                >
                  <p>
                    Price: $
                    {currency.price < 0.01 && currency.price > 0.001
                      ? millify(currency.price, { precision: 4 })
                      : currency.price < 0.001
                      ? millify(currency.price, { precision: 5 })
                      : currency.price < 1000
                      ? millify(currency.price, { precision: 2 })
                      : millify(currency.price)}
                  </p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>
                    Daily Change:{' '}
                    <span
                      id="change"
                      /*Give the daily change span a class of positive or negative based on the current change. Those classes decide if the span will be green or red */
                      className={`${
                        millify(currency.change) > 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {millify(currency.change)}%
                    </span>{' '}
                  </p>
                </Card>
              </Link>
            </Col>
          ),
        )}
      </Row>
    </>
  )
}

export default Cryptocurrencies
