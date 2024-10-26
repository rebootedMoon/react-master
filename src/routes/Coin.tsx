import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
const Container = styled.div`
  padding: 0px 10px;
  margin: 0 auto;
  width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loadder = styled.span`
  margin-top: 30px;
  text-align: center;
  font-size: larger;
  display: block;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  padding: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0px;
  gap: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  background-color: rgba(0, 0, 0.5);
  /* a {
    display: block;
  } */
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } =
    useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickerLoading, data: tickersData } =
    useQuery<PriceData>(["tickers", coinId], () =>
      fetchCoinInfo(coinId)
    );

  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : loading
            ? "Loading"
            : infoData?.name}{" "}
        </Title>
      </Header>
      {loading ? (
        <Loadder>"Loading..."</Loadder>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span> Rank:</span>
              <span> {infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span> Symbol:</span>
              <span> {infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span> Open Source:</span>
              <span> {infoData?.open_source ? "YES" : "NO"}</span>
            </OverviewItem>
          </Overview>
          <Description> {infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span> Total Supply:</span>
              <span> {tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span> Max Supply:</span>
              <span> {tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <span></span>
              <Link to={`/${coinId}/Chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/Price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
