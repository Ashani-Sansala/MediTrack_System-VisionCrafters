import {Outlet} from "react-router-dom";
import TitleBarLanding from "../components/Main/TitleBarLanding.jsx";
import PageBottom from "../components/Main/PageBottom.jsx";
import '../styles/Layout01.scss'



export default function Layout01() {
    return (
        <div>
            <div className="TopCont">
                <TitleBarLanding/>
            </div>

            <div className="Cont">
                <Outlet/>
            </div>
            <div className="BottomCont">
                <PageBottom/>
            </div>

        </div>
    );
}
