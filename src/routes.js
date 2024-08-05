import React from "react"
import App from "./App"
import CastleLaundry from "./Laundry Bateng/castleLaundry"
import BabakanRaya from "./Wilayah/BabakanRaya"
import BabakanTengah from "./Wilayah/BabakanTengah"
import BabakanLio from "./Wilayah/BabakanLio"
import BabakanLebak from "./Wilayah/BabakanLebak"
import Cangkurawok from "./Wilayah/Cangkurawok"
import Cibanteng from "./Wilayah/Cibanteng"
import Perwira from "./Wilayah/Perwira"
import GoodLaundry from "./Laundry Bateng/GoodLaundry"
import Eternity from "./Laundry Bateng/Eternity"
import Pikashoe from "./Laundry Balebak/Pikashoe"
import XtraLaundry from "./Laundry Balebak/XtraLaundry"
import LaundryGeulis from "./Laundry Balebak/LaundryGeulis"
import MutiaLaundry from "./Laundry Balebak/MutiaLaundry"
import JuraganKucek from "./Laundry Balio/juraganKucek"
import RidhoLaundry from "./Laundry Balio/RidhoLaundry"
import DitaLaundry from "./Laundry Balio/DitaLaundry"
import BerkahLaundry from "./Laundry Balio/BerkahLaundry"
import MutiaraRatuLaundry from "./Laundry Balio/MutiaraRatu"
import ExtraLaundry2 from "./Laundry Balio/ExtraLaundry2"
import HSLaundry from "./Laundry Balio/HSLaundry"
import AzriilLaundry from "./Laundry Balio/AzzrilLaundry"
import Arraya from "./Laundry Cibanteng/Arraya"
import HiroturLaundry from "./Laundry Cibanteng/Hirotur"
import AboutUsHP from "./ComponentsHP/AboutUsHP"
import OurServicesHP from "./ComponentsHP/ServicesHP"
import GeaClean from "./Laundry Balebak/GeaClean"

const Routess = [
    {
        path:"/",
        element: <App/>,
    },
    {
        path:"/location",
        element: <BabakanLebak/>,
    },
    {
        path:"/castlelaundry",
        element: <CastleLaundry/>,
    },
    {
        path:"/babakanraya",
        element: <BabakanRaya/>,
    },
    {
        path:"/babakantengah",
        element: <BabakanTengah/>,
    },
    {
        path:"/babakanlio",
        element: <BabakanLio/>,
    },
    
    {
        path:"/babakanlebak",
        element: <BabakanLebak/>,
    },
    {
        path:"/cangkurawok",
        element: <Cangkurawok/>,
    },
    {
        path:"/cibanteng",
        element: <Cibanteng/>,
    },
    {
        path:"/perwira",
        element: <Perwira/>,
    },
    {
        path:"/goodlaundry",
        element: <GoodLaundry/>,
    },
    {
        path:"/eternity",
        element: <Eternity/>,
    },
    {
        path:"/pikashoe",
        element: <Pikashoe/>,
    },
    {
        path:"/xtralaundry",
        element: <XtraLaundry/>,
    },
    {
        path:"/laundrygeulis",
        element: <LaundryGeulis/>,
    },
    {
        path:"/mutialaundry",
        element: <MutiaLaundry/>,
    },
    {
        path:"/juragankucek",
        element: <JuraganKucek/>,
    },
    {
        path:"/ridholaundry",
        element: <RidhoLaundry/>,
    },
    {
        path:"/ditalaundry",
        element: <DitaLaundry/>,
    },
    {
        path:"/berkahlaundry",
        element: <BerkahLaundry/>,
    },
    {
        path:"/mutiaralaundry",
        element: <MutiaraRatuLaundry/>,
    },
    {
        path:"/extralaundry2",
        element: <ExtraLaundry2/>,
    },
    {
        path:"/hslaundry",
        element: <HSLaundry/>,
    },
    {
        path:"/azriillaundry",
        element: <AzriilLaundry/>,
    },
    {
        path:"/arraya",
        element: <Arraya/>,
    },
    {
        path:"/hirotur",
        element: <HiroturLaundry/>,
    },
    {
        path:"/aboutushp",
        element: <AboutUsHP/>,
    },
    {
        path:"/serviceshp",
        element: <OurServicesHP/>,
    },
    {
        path:"/geaclean",
        element: <GeaClean/>,
    },
]

export default Routess