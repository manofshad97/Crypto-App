import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    return ('Exchanges Section Coming Soon!')
//   const { data, isFetching } = useGetExchangesQuery()
//   const exchangesList = data?.data?.exchanges
 
//   if (isFetching) return <Loader />;

//   return (
//     <>
//       <Row>
//         <Col span={8}>Exchanges</Col>
//         <Col span={8}>Markets</Col>
//         <Col span={8}>Change</Col>
//       </Row>
//       <Row>
//          {exchangesList.map((exchange) => (
//           <Col span={24}>
              
//             <Collapse>
//             <div className='flexxy'>
//               <Panel
//                 key={exchange.uuid}
//                 showArrow={false}
//                 header={(
//                    <div className='flexxy2'>
//                   <Row key={exchange.uuid}>
                      
//                     <Col span={8}>
//                       <Text><strong>{exchange.rank}.</strong></Text>
//                       <Avatar className="exchange-image" src={exchange.iconUrl} />
//                       <Text><strong>{exchange.name}</strong></Text>
//                     </Col>
//                     <Col span={8}>{millify(exchange.numberOfMarkets)}</Col>
//                     <Col span={8}>{millify(exchange.marketShare)}%</Col>
                    
//                   </Row>
//                   </div> 
                  
//                   )}
//               >
//                 {exchange.coinrankingUrl}
//               </Panel>
//               </div>
//             </Collapse>
            
//           </Col>
          
//         ))} 
//       </Row>
//     </>
//   );
};

export default Exchanges;