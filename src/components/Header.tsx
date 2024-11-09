import styled from "styled-components";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  height: 80px;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  position: relative;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.red};
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
const Search = styled.form`
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 25px;
  }
  position: relative;
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  z-index: -1;
  right: 0px;
  padding: 5px 10px;
  padding-left: 34px;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};
interface IForm {
  keyword: string;
}
function Header() {
  const homeMatch = useRouteMatch("/");
  const comingSoonMatch = useRouteMatch("/coming-soon");
  const nowPlayingMatch = useRouteMatch("/now-playing");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimationControls();
  const navAnimation = useAnimationControls();
  const { scrollY } = useScroll();
  const history = useHistory();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  console.log(homeMatch, nowPlayingMatch, comingSoonMatch);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    history.push(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>

        <Items>
          <Link to="/">
            <Item>
              Popular
              {homeMatch?.isExact && <Circle layoutId="circle" />}
            </Item>
          </Link>
          <Link to="/coming-soon">
            <Item>
              Coming Soon
              {comingSoonMatch && <Circle layoutId="circle" />}
            </Item>
          </Link>
          <Link to="/now-playing">
            <Item>
              Now Playing
              {nowPlayingMatch && <Circle layoutId="circle" />}
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "linear" }}
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for Movie or tv show"
          />
        </Search>
      </Col>
    </Nav>
  );
}
export default Header;
