import React from "react";
import styles from "./wherebuy.module.scss";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  city: string;
  shop: string;
  address: string;
  phone: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Город",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Магазин",
    dataIndex: "shop",
    key: "shop",
    render: (text) => <a href={"http://midimarket.ru/"}>{text}</a>,
  },
  {
    title: "Телефон",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Почта",
    key: "email",
    dataIndex: "email",
    render: (text) => <a href={"mailto:orlovdanorlov@gmail.com"}>{text}</a>,
  },
];

const WhereBuy = () => {
  const data: DataType[] = [
    {
      key: "1",
      city: "Архангельск",
      shop: "Мидимаркет",
      phone: "89031111111",
      address: "г. Архангельск, ул. Воскресенская, д. 104 ",
      email: "i268825@ya.ru",
    },
    {
      key: "2",
      city: "Архангельск",
      shop: "Мидимаркет",
      phone: "89031111111",
      address: "г. Архангельск, ул. Воскресенская, д. 104 ",
      email: "i268825@ya.ru",
    },
    {
      key: " 3",
      city: "Архангельск",
      shop: "Мидимаркет",
      phone: "89031111111",
      address: "г. Архангельск, ул. Воскресенская, д. 104 ",
      email: "i268825@ya.ru",
    },
    {
      key: "4",
      city: "Архангельск",
      shop: "Мидимаркет",
      phone: "89031111111",
      address: "г. Архангельск, ул. Воскресенская, д. 104 ",
      email: "i268825@ya.ru",
    },
  ];

  // @ts-ignore
  return (
    <>
      <div className={styles.container}>
        <h2>Где купить?</h2>
        <div className={styles.info}>
          <p>
            Продукцию брендов, дистрибутируемых компанией ДИЛЕРЦЕНТР, можно
            приобрести или заказать у официальных дилеров компании.
          </p>
          <Table columns={columns} dataSource={data} />
        </div>
        <iframe
          className={styles.map}
          id="map_709673590"
          frameBorder="0"
          width="100%"
          height="600px"
          sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          srcDoc={`
      <iframe id="map_292048992" frameborder="0" width="100%" height="400px" sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe><script type="text/javascript">(function(e,t){var r=document.getElementById(e);r.contentWindow.document.open(),r.contentWindow.document.write(atob(t)),r.contentWindow.document.close()})("map_292048992", "PGJvZHk+PHN0eWxlPgogICAgICAgIGh0bWwsIGJvZHkgewogICAgICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgfQogICAgICAgIGh0bWwsIGJvZHksICNtYXAgewogICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgIH0KICAgICAgICAuYnVsbGV0LW1hcmtlciB7CiAgICAgICAgICAgIHdpZHRoOiAyMHB4OwogICAgICAgICAgICBoZWlnaHQ6IDIwcHg7CiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7CiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTsKICAgICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgIzAyODFmMjsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICAgIH0KICAgICAgICAucGVybWFuZW50LXRvb2x0aXAgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lOwogICAgICAgICAgICBib3gtc2hhZG93OiBub25lOwogICAgICAgICAgICBib3JkZXI6IG5vbmU7CiAgICAgICAgICAgIHBhZGRpbmc6IDZweCAxMnB4OwogICAgICAgICAgICBjb2xvcjogIzI2MjYyNjsKICAgICAgICB9CiAgICAgICAgLnBlcm1hbmVudC10b29sdGlwOmJlZm9yZSB7CiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7CiAgICAgICAgfQogICAgICAgIC5kZy1wb3B1cF9oaWRkZW5fdHJ1ZSB7CiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgICAgIH0KICAgICAgICAubGVhZmxldC1jb250YWluZXIgLmxlYWZsZXQtcG9wdXAgLmxlYWZsZXQtcG9wdXAtY2xvc2UtYnV0dG9uIHsKICAgICAgICAgICAgdG9wOiAwOwogICAgICAgICAgICByaWdodDogMDsKICAgICAgICAgICAgd2lkdGg6IDIwcHg7CiAgICAgICAgICAgIGhlaWdodDogMjBweDsKICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OwogICAgICAgICAgICBsaW5lLWhlaWdodDogMTsKICAgICAgICB9CiAgICA8L3N0eWxlPjxkaXYgaWQ9Im1hcCI+PC9kaXY+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iaHR0cHM6Ly9tYXBzLmFwaS4yZ2lzLnJ1LzIuMC9sb2FkZXIuanM/cGtnPWZ1bGwmYW1wO3NraW49bGlnaHQiPjwvc2NyaXB0PjxzY3JpcHQ+KGZ1bmN0aW9uKGUpe3ZhciB0PUpTT04ucGFyc2UoZSkscj10Lm9yZGVyZWRHZW9tZXRyaWVzLG49dC5tYXBQb3NpdGlvbixhPXQuaXNXaGVlbFpvb21FbmFibGVkO2Z1bmN0aW9uIG8oZSl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKGUpLnNwbGl0KCIiKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIiUiKygiMDAiK2UuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKX0pLmpvaW4oIiIpKX1ERy50aGVuKGZ1bmN0aW9uKCl7dmFyIGU9REcubWFwKCJtYXAiLHtjZW50ZXI6W24ubGF0LG4ubG9uXSx6b29tOm4uem9vbSxzY3JvbGxXaGVlbFpvb206YSx6b29tQ29udHJvbDohYX0pO0RHLmdlb0pTT04ocix7c3R5bGU6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGEsbztyZXR1cm57ZmlsbENvbG9yOm51bGw9PT0odD1lKXx8dm9pZCAwPT09dD92b2lkIDA6dC5wcm9wZXJ0aWVzLmZpbGxDb2xvcixmaWxsT3BhY2l0eTpudWxsPT09KHI9ZSl8fHZvaWQgMD09PXI/dm9pZCAwOnIucHJvcGVydGllcy5maWxsT3BhY2l0eSxjb2xvcjpudWxsPT09KG49ZSl8fHZvaWQgMD09PW4/dm9pZCAwOm4ucHJvcGVydGllcy5zdHJva2VDb2xvcix3ZWlnaHQ6bnVsbD09PShhPWUpfHx2b2lkIDA9PT1hP3ZvaWQgMDphLnByb3BlcnRpZXMuc3Ryb2tlV2lkdGgsb3BhY2l0eTpudWxsPT09KG89ZSl8fHZvaWQgMD09PW8/dm9pZCAwOm8ucHJvcGVydGllcy5zdHJva2VPcGFjaXR5fX0scG9pbnRUb0xheWVyOmZ1bmN0aW9uKGUsdCl7cmV0dXJuInJhZGl1cyJpbiBlLnByb3BlcnRpZXM/REcuY2lyY2xlKHQsZS5wcm9wZXJ0aWVzLnJhZGl1cyk6REcubWFya2VyKHQse2ljb246ZnVuY3Rpb24oZSl7cmV0dXJuIERHLmRpdkljb24oe2h0bWw6IjxkaXYgY2xhc3M9J2J1bGxldC1tYXJrZXInIHN0eWxlPSdib3JkZXItY29sb3I6ICIrZSsiOyc+PC9kaXY+IixjbGFzc05hbWU6Im92ZXJyaWRlLWRlZmF1bHQiLGljb25TaXplOlsyMCwyMF0saWNvbkFuY2hvcjpbMTAsMTBdfSl9KGUucHJvcGVydGllcy5jb2xvcil9KX0sb25FYWNoRmVhdHVyZTpmdW5jdGlvbihlLHQpe2UucHJvcGVydGllcy5kZXNjcmlwdGlvbiYmdC5iaW5kUG9wdXAobyhlLnByb3BlcnRpZXMuZGVzY3JpcHRpb24pLHtjbG9zZUJ1dHRvbjohMCxjbG9zZU9uRXNjYXBlS2V5OiEwfSksZS5wcm9wZXJ0aWVzLnRpdGxlJiZ0LmJpbmRUb29sdGlwKG8oZS5wcm9wZXJ0aWVzLnRpdGxlKSx7cGVybWFuZW50OiEwLG9wYWNpdHk6MSxjbGFzc05hbWU6InBlcm1hbmVudC10b29sdGlwIn0pfX0pLmFkZFRvKGUpfSl9KSgneyJvcmRlcmVkR2VvbWV0cmllcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJwcm9wZXJ0aWVzIjp7ImNvbG9yIjoiI2YwYjdhNSIsInRpdGxlIjoiMEp6UXVOQzAwTGpRdk5DdzBZRFF1dEMxMFlJPSIsImRlc2NyaXB0aW9uIjoiIiwiekluZGV4IjoxMDAwMDAwMDAwfSwiZ2VvbWV0cnkiOnsidHlwZSI6IlBvaW50IiwiY29vcmRpbmF0ZXMiOls0MC41NTQzNTcsNjQuNTQ2MDI5XX0sImlkIjoxMzk3fSx7InR5cGUiOiJGZWF0dXJlIiwicHJvcGVydGllcyI6eyJjb2xvciI6IiNmMGI3YTUiLCJ0aXRsZSI6IjBKalFueURRcGRDKzBMdlF1dEMrMExMUmdkQzYwTERSanlEUW15NGcwSkl1IiwiZGVzY3JpcHRpb24iOiIiLCJ6SW5kZXgiOjEwMDAwMDAwMDB9LCJnZW9tZXRyeSI6eyJ0eXBlIjoiUG9pbnQiLCJjb29yZGluYXRlcyI6WzEyNy41NDIyMiw1MC4yNTk5NTNdfSwiaWQiOjI2MTF9XSwibWFwUG9zaXRpb24iOnsibGF0Ijo1MC4yNjEyNTM4Mjc1ODQ3MjQsImxvbiI6MTI4LjU2NzUwNDg4MjgxMjUzLCJ6b29tIjo3fSwiaXNXaGVlbFpvb21FbmFibGVkIjp0cnVlfScpPC9zY3JpcHQ+PHNjcmlwdCBhc3luYz0iIiB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIHNyYz0iaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD1VQS0xNTg4NjYxNjgtMSI+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPihmdW5jdGlvbihlKXtmdW5jdGlvbiB0KCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKX13aW5kb3cuZGF0YUxheWVyPXdpbmRvdy5kYXRhTGF5ZXJ8fFtdLHQoImpzIixuZXcgRGF0ZSksdCgiY29uZmlnIixlKSx3aW5kb3cuZ3RhZz10fSkoJ1VBLTE1ODg2NjE2OC0xJyk8L3NjcmlwdD48L2JvZHk+")</script>

  `}
        ></iframe>
      </div>
    </>
  );
};

export default WhereBuy;
