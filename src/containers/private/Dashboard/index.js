import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useTrail, animated } from "react-spring";

import { Banner } from "components/Banner";

import { Badges } from "./components/Badges";
import { Challenges } from "./components/Challenges";
import { MyChallenges } from "./components/MyChallenges";
import { RecommendedChallenges } from "./components/RecommendedChallenges";
import { Feedbacks } from "./components/Feedbacks";
import { InCompany } from "./components/InCompany";
import { Ultradesafio } from "./components/Ultradesafio";
import { DesafiosCadastrados } from "./components/DesafiosCadastrados";

import { dashboardFetch } from "services/dashboard";

import styles from "./styles.module.sass";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.dashboard);
  const { data: usertype } = useSelector((state) => state.usertype);

  const Trail = ({ open, children, className }) => {
    const items = React.Children.toArray(children);
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      // height: open ? "auto" : 0,
      from: { opacity: 0, x: 20, height: 0 },
    });
    return (
      <div>
        {trail.map(({ height, ...style }, index) => (
          <animated.div key={index}>
            <animated.main className={className} style={style}>
              {items[index]}
            </animated.main>
          </animated.div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(dashboardFetch(usertype));
  }, [dispatch, usertype]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mundo Jix - Dashboard</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      {usertype === "talento" && (
        <main open={!loading} className={styles.dashboard__talento}>
          {/* grid 1 - 3 */}
          <section style={{ gridArea: "insignia" }}>
            <Trail open={!loading}>
              <Badges />
            </Trail>
          </section>

          {/* grid 1 - 2 */}
          <section className={styles.group}>
            <Trail open={!loading}>
              <Challenges />
              <MyChallenges />
              <RecommendedChallenges />
            </Trail>
          </section>

          {/* grid 2 - 3 */}
          <section style={{ gridArea: "feedbacks" }}>
            <Feedbacks />
          </section>
        </main>
      )}

      {usertype === "empresa" && (
        <main className={styles.dashboard__empresa}>
          <Banner
            full
            title={
              "Encontre os melhores talentos para o seu negócio agora mesmo"
            }
            button={"Cadastrar desafio"}
            to={"/novo-desafio"}
          />

          <Badges />

          <InCompany />

          <Ultradesafio />

          <DesafiosCadastrados />
        </main>
      )}
    </>
  );
};

export { Dashboard };
