import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import { usePersonalDetails } from "@/hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";

const options = [
    {
        "id": 1,
        "name": "South Georgia",
        "countryCode": "+500",
        "countryFlag": "https://flagcdn.com/w320/gs.png",
        "countryPhoneLength": 10,
        "shortCode": "500",
        "currency": "SHP",
        "currencySymbol": "£"
    },
    {
        "id": 2,
        "name": "Grenada",
        "countryCode": "+1473",
        "countryFlag": "https://flagcdn.com/w320/gd.png",
        "countryPhoneLength": 10,
        "shortCode": "1473",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 3,
        "name": "Switzerland",
        "countryCode": "+41",
        "countryFlag": "https://flagcdn.com/w320/ch.png",
        "countryPhoneLength": 10,
        "shortCode": "41",
        "currency": "CHF",
        "currencySymbol": "Fr."
    },
    {
        "id": 4,
        "name": "Sierra Leone",
        "countryCode": "+232",
        "countryFlag": "https://flagcdn.com/w320/sl.png",
        "countryPhoneLength": 10,
        "shortCode": "232",
        "currency": "SLL",
        "currencySymbol": "Le"
    },
    {
        "id": 5,
        "name": "Hungary",
        "countryCode": "+36",
        "countryFlag": "https://flagcdn.com/w320/hu.png",
        "countryPhoneLength": 10,
        "shortCode": "36",
        "currency": "HUF",
        "currencySymbol": "Ft"
    },
    {
        "id": 6,
        "name": "Taiwan",
        "countryCode": "+886",
        "countryFlag": "https://flagcdn.com/w320/tw.png",
        "countryPhoneLength": 10,
        "shortCode": "886",
        "currency": "TWD",
        "currencySymbol": "$"
    },
    {
        "id": 7,
        "name": "Wallis and Futuna",
        "countryCode": "+681",
        "countryFlag": "https://flagcdn.com/w320/wf.png",
        "countryPhoneLength": 10,
        "shortCode": "681",
        "currency": "XPF",
        "currencySymbol": "₣"
    },
    {
        "id": 8,
        "name": "Barbados",
        "countryCode": "+1246",
        "countryFlag": "https://flagcdn.com/w320/bb.png",
        "countryPhoneLength": 10,
        "shortCode": "1246",
        "currency": "BBD",
        "currencySymbol": "$"
    },
    {
        "id": 9,
        "name": "Pitcairn Islands",
        "countryCode": "+64",
        "countryFlag": "https://flagcdn.com/w320/pn.png",
        "countryPhoneLength": 10,
        "shortCode": "64",
        "currency": "NZD",
        "currencySymbol": "$"
    },
    {
        "id": 10,
        "name": "Ivory Coast",
        "countryCode": "+225",
        "countryFlag": "https://flagcdn.com/w320/ci.png",
        "countryPhoneLength": 10,
        "shortCode": "225",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 11,
        "name": "Tunisia",
        "countryCode": "+216",
        "countryFlag": "https://flagcdn.com/w320/tn.png",
        "countryPhoneLength": 10,
        "shortCode": "216",
        "currency": "TND",
        "currencySymbol": "د.ت"
    },
    {
        "id": 12,
        "name": "Italy",
        "countryCode": "+39",
        "countryFlag": "https://flagcdn.com/w320/it.png",
        "countryPhoneLength": 10,
        "shortCode": "39",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 13,
        "name": "Benin",
        "countryCode": "+229",
        "countryFlag": "https://flagcdn.com/w320/bj.png",
        "countryPhoneLength": 10,
        "shortCode": "229",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 14,
        "name": "Indonesia",
        "countryCode": "+62",
        "countryFlag": "https://flagcdn.com/w320/id.png",
        "countryPhoneLength": 10,
        "shortCode": "62",
        "currency": "IDR",
        "currencySymbol": "Rp"
    },
    {
        "id": 15,
        "name": "Cape Verde",
        "countryCode": "+238",
        "countryFlag": "https://flagcdn.com/w320/cv.png",
        "countryPhoneLength": 10,
        "shortCode": "238",
        "currency": "CVE",
        "currencySymbol": "Esc"
    },
    {
        "id": 16,
        "name": "Saint Kitts and Nevis",
        "countryCode": "+1869",
        "countryFlag": "https://flagcdn.com/w320/kn.png",
        "countryPhoneLength": 10,
        "shortCode": "1869",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 17,
        "name": "Laos",
        "countryCode": "+856",
        "countryFlag": "https://flagcdn.com/w320/la.png",
        "countryPhoneLength": 10,
        "shortCode": "856",
        "currency": "LAK",
        "currencySymbol": "₭"
    },
    {
        "id": 18,
        "name": "Caribbean Netherlands",
        "countryCode": "+599",
        "countryFlag": "https://flagcdn.com/w320/bq.png",
        "countryPhoneLength": 10,
        "shortCode": "599",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 19,
        "name": "Uganda",
        "countryCode": "+256",
        "countryFlag": "https://flagcdn.com/w320/ug.png",
        "countryPhoneLength": 10,
        "shortCode": "256",
        "currency": "UGX",
        "currencySymbol": "Sh"
    },
    {
        "id": 20,
        "name": "Andorra",
        "countryCode": "+376",
        "countryFlag": "https://flagcdn.com/w320/ad.png",
        "countryPhoneLength": 10,
        "shortCode": "376",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 21,
        "name": "Burundi",
        "countryCode": "+257",
        "countryFlag": "https://flagcdn.com/w320/bi.png",
        "countryPhoneLength": 10,
        "shortCode": "257",
        "currency": "BIF",
        "currencySymbol": "Fr"
    },
    {
        "id": 22,
        "name": "South Africa",
        "countryCode": "+27",
        "countryFlag": "https://flagcdn.com/w320/za.png",
        "countryPhoneLength": 10,
        "shortCode": "27",
        "currency": "ZAR",
        "currencySymbol": "R"
    },
    {
        "id": 23,
        "name": "France",
        "countryCode": "+33",
        "countryFlag": "https://flagcdn.com/w320/fr.png",
        "countryPhoneLength": 10,
        "shortCode": "33",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 24,
        "name": "Libya",
        "countryCode": "+218",
        "countryFlag": "https://flagcdn.com/w320/ly.png",
        "countryPhoneLength": 10,
        "shortCode": "218",
        "currency": "LYD",
        "currencySymbol": "ل.د"
    },
    {
        "id": 25,
        "name": "Mexico",
        "countryCode": "+52",
        "countryFlag": "https://flagcdn.com/w320/mx.png",
        "countryPhoneLength": 10,
        "shortCode": "52",
        "currency": "MXN",
        "currencySymbol": "$"
    },
    {
        "id": 26,
        "name": "Gabon",
        "countryCode": "+241",
        "countryFlag": "https://flagcdn.com/w320/ga.png",
        "countryPhoneLength": 10,
        "shortCode": "241",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 27,
        "name": "Northern Mariana Islands",
        "countryCode": "+1670",
        "countryFlag": "https://flagcdn.com/w320/mp.png",
        "countryPhoneLength": 10,
        "shortCode": "1670",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 28,
        "name": "North Macedonia",
        "countryCode": "+389",
        "countryFlag": "https://flagcdn.com/w320/mk.png",
        "countryPhoneLength": 10,
        "shortCode": "389",
        "currency": "MKD",
        "currencySymbol": "den"
    },
    {
        "id": 29,
        "name": "China",
        "countryCode": "+86",
        "countryFlag": "https://flagcdn.com/w320/cn.png",
        "countryPhoneLength": 10,
        "shortCode": "86",
        "currency": "CNY",
        "currencySymbol": "¥"
    },
    {
        "id": 30,
        "name": "Yemen",
        "countryCode": "+967",
        "countryFlag": "https://flagcdn.com/w320/ye.png",
        "countryPhoneLength": 10,
        "shortCode": "967",
        "currency": "YER",
        "currencySymbol": "﷼"
    },
    {
        "id": 31,
        "name": "Saint Barthélemy",
        "countryCode": "+590",
        "countryFlag": "https://flagcdn.com/w320/bl.png",
        "countryPhoneLength": 10,
        "shortCode": "590",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 32,
        "name": "Guernsey",
        "countryCode": "+44",
        "countryFlag": "https://flagcdn.com/w320/gg.png",
        "countryPhoneLength": 10,
        "shortCode": "44",
        "currency": "GBP",
        "currencySymbol": "£"
    },
    {
        "id": 33,
        "name": "Solomon Islands",
        "countryCode": "+677",
        "countryFlag": "https://flagcdn.com/w320/sb.png",
        "countryPhoneLength": 10,
        "shortCode": "677",
        "currency": "SBD",
        "currencySymbol": "$"
    },
    {
        "id": 34,
        "name": "Svalbard and Jan Mayen",
        "countryCode": "+4779",
        "countryFlag": "https://flagcdn.com/w320/sj.png",
        "countryPhoneLength": 10,
        "shortCode": "4779",
        "currency": "NOK",
        "currencySymbol": "kr"
    },
    {
        "id": 35,
        "name": "Faroe Islands",
        "countryCode": "+298",
        "countryFlag": "https://flagcdn.com/w320/fo.png",
        "countryPhoneLength": 10,
        "shortCode": "298",
        "currency": "DKK",
        "currencySymbol": "kr"
    },
    {
        "id": 36,
        "name": "Uzbekistan",
        "countryCode": "+998",
        "countryFlag": "https://flagcdn.com/w320/uz.png",
        "countryPhoneLength": 10,
        "shortCode": "998",
        "currency": "UZS",
        "currencySymbol": "so'm"
    },
    {
        "id": 37,
        "name": "Egypt",
        "countryCode": "+20",
        "countryFlag": "https://flagcdn.com/w320/eg.png",
        "countryPhoneLength": 10,
        "shortCode": "20",
        "currency": "EGP",
        "currencySymbol": "£"
    },
    {
        "id": 38,
        "name": "Senegal",
        "countryCode": "+221",
        "countryFlag": "https://flagcdn.com/w320/sn.png",
        "countryPhoneLength": 10,
        "shortCode": "221",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 39,
        "name": "Sri Lanka",
        "countryCode": "+94",
        "countryFlag": "https://flagcdn.com/w320/lk.png",
        "countryPhoneLength": 10,
        "shortCode": "94",
        "currency": "LKR",
        "currencySymbol": "Rs  රු"
    },
    {
        "id": 40,
        "name": "Palestine",
        "countryCode": "+970",
        "countryFlag": "https://flagcdn.com/w320/ps.png",
        "countryPhoneLength": 10,
        "shortCode": "970",
        "currency": "EGP",
        "currencySymbol": "E£"
    },
    {
        "id": 41,
        "name": "Bangladesh",
        "countryCode": "+880",
        "countryFlag": "https://flagcdn.com/w320/bd.png",
        "countryPhoneLength": 10,
        "shortCode": "880",
        "currency": "BDT",
        "currencySymbol": "৳"
    },
    {
        "id": 42,
        "name": "Peru",
        "countryCode": "+51",
        "countryFlag": "https://flagcdn.com/w320/pe.png",
        "countryPhoneLength": 10,
        "shortCode": "51",
        "currency": "PEN",
        "currencySymbol": "S/ "
    },
    {
        "id": 43,
        "name": "Singapore",
        "countryCode": "+65",
        "countryFlag": "https://flagcdn.com/w320/sg.png",
        "countryPhoneLength": 10,
        "shortCode": "65",
        "currency": "SGD",
        "currencySymbol": "$"
    },
    {
        "id": 44,
        "name": "Turkey",
        "countryCode": "+90",
        "countryFlag": "https://flagcdn.com/w320/tr.png",
        "countryPhoneLength": 10,
        "shortCode": "90",
        "currency": "TRY",
        "currencySymbol": "₺"
    },
    {
        "id": 45,
        "name": "Afghanistan",
        "countryCode": "+93",
        "countryFlag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
        "countryPhoneLength": 10,
        "shortCode": "93",
        "currency": "AFN",
        "currencySymbol": "؋"
    },
    {
        "id": 46,
        "name": "Aruba",
        "countryCode": "+297",
        "countryFlag": "https://flagcdn.com/w320/aw.png",
        "countryPhoneLength": 10,
        "shortCode": "297",
        "currency": "AWG",
        "currencySymbol": "ƒ"
    },
    {
        "id": 47,
        "name": "Cook Islands",
        "countryCode": "+682",
        "countryFlag": "https://flagcdn.com/w320/ck.png",
        "countryPhoneLength": 10,
        "shortCode": "682",
        "currency": "CKD",
        "currencySymbol": "$"
    },
    {
        "id": 48,
        "name": "United Kingdom",
        "countryCode": "+44",
        "countryFlag": "https://flagcdn.com/w320/gb.png",
        "countryPhoneLength": 10,
        "shortCode": "44",
        "currency": "GBP",
        "currencySymbol": "£"
    },
    {
        "id": 49,
        "name": "Zambia",
        "countryCode": "+260",
        "countryFlag": "https://flagcdn.com/w320/zm.png",
        "countryPhoneLength": 10,
        "shortCode": "260",
        "currency": "ZMW",
        "currencySymbol": "ZK"
    },
    {
        "id": 50,
        "name": "Finland",
        "countryCode": "+358",
        "countryFlag": "https://flagcdn.com/w320/fi.png",
        "countryPhoneLength": 10,
        "shortCode": "358",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 51,
        "name": "Niger",
        "countryCode": "+227",
        "countryFlag": "https://flagcdn.com/w320/ne.png",
        "countryPhoneLength": 10,
        "shortCode": "227",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 52,
        "name": "Christmas Island",
        "countryCode": "+61",
        "countryFlag": "https://flagcdn.com/w320/cx.png",
        "countryPhoneLength": 10,
        "shortCode": "61",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 53,
        "name": "Tokelau",
        "countryCode": "+690",
        "countryFlag": "https://flagcdn.com/w320/tk.png",
        "countryPhoneLength": 10,
        "shortCode": "690",
        "currency": "NZD",
        "currencySymbol": "$"
    },
    {
        "id": 54,
        "name": "Guinea-Bissau",
        "countryCode": "+245",
        "countryFlag": "https://flagcdn.com/w320/gw.png",
        "countryPhoneLength": 10,
        "shortCode": "245",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 55,
        "name": "Azerbaijan",
        "countryCode": "+994",
        "countryFlag": "https://flagcdn.com/w320/az.png",
        "countryPhoneLength": 10,
        "shortCode": "994",
        "currency": "AZN",
        "currencySymbol": "₼"
    },
    {
        "id": 56,
        "name": "Réunion",
        "countryCode": "+262",
        "countryFlag": "https://flagcdn.com/w320/re.png",
        "countryPhoneLength": 10,
        "shortCode": "262",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 57,
        "name": "Djibouti",
        "countryCode": "+253",
        "countryFlag": "https://flagcdn.com/w320/dj.png",
        "countryPhoneLength": 10,
        "shortCode": "253",
        "currency": "DJF",
        "currencySymbol": "Fr"
    },
    {
        "id": 58,
        "name": "North Korea",
        "countryCode": "+850",
        "countryFlag": "https://flagcdn.com/w320/kp.png",
        "countryPhoneLength": 10,
        "shortCode": "850",
        "currency": "KPW",
        "currencySymbol": "₩"
    },
    {
        "id": 59,
        "name": "Mauritius",
        "countryCode": "+230",
        "countryFlag": "https://flagcdn.com/w320/mu.png",
        "countryPhoneLength": 10,
        "shortCode": "230",
        "currency": "MUR",
        "currencySymbol": "₨"
    },
    {
        "id": 60,
        "name": "Montserrat",
        "countryCode": "+1664",
        "countryFlag": "https://flagcdn.com/w320/ms.png",
        "countryPhoneLength": 10,
        "shortCode": "1664",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 61,
        "name": "United States Virgin Islands",
        "countryCode": "+1340",
        "countryFlag": "https://flagcdn.com/w320/vi.png",
        "countryPhoneLength": 10,
        "shortCode": "1340",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 62,
        "name": "Colombia",
        "countryCode": "+57",
        "countryFlag": "https://flagcdn.com/w320/co.png",
        "countryPhoneLength": 10,
        "shortCode": "57",
        "currency": "COP",
        "currencySymbol": "$"
    },
    {
        "id": 63,
        "name": "Greece",
        "countryCode": "+30",
        "countryFlag": "https://flagcdn.com/w320/gr.png",
        "countryPhoneLength": 10,
        "shortCode": "30",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 64,
        "name": "Croatia",
        "countryCode": "+385",
        "countryFlag": "https://flagcdn.com/w320/hr.png",
        "countryPhoneLength": 10,
        "shortCode": "385",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 65,
        "name": "Morocco",
        "countryCode": "+212",
        "countryFlag": "https://flagcdn.com/w320/ma.png",
        "countryPhoneLength": 10,
        "shortCode": "212",
        "currency": "MAD",
        "currencySymbol": "د.م."
    },
    {
        "id": 66,
        "name": "Algeria",
        "countryCode": "+213",
        "countryFlag": "https://flagcdn.com/w320/dz.png",
        "countryPhoneLength": 10,
        "shortCode": "213",
        "currency": "DZD",
        "currencySymbol": "د.ج"
    },
    {
        "id": 67,
        "name": "Antarctica",
        "countryCode": "undefined",
        "countryFlag": "https://flagcdn.com/w320/aq.png",
        "countryPhoneLength": 10,
        "shortCode": "ndefined",
        "currency": null,
        "currencySymbol": null
    },
    {
        "id": 68,
        "name": "Netherlands",
        "countryCode": "+31",
        "countryFlag": "https://flagcdn.com/w320/nl.png",
        "countryPhoneLength": 10,
        "shortCode": "31",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 69,
        "name": "Sudan",
        "countryCode": "+249",
        "countryFlag": "https://flagcdn.com/w320/sd.png",
        "countryPhoneLength": 10,
        "shortCode": "249",
        "currency": "SDG",
        "currencySymbol": "ج.س"
    },
    {
        "id": 70,
        "name": "Fiji",
        "countryCode": "+679",
        "countryFlag": "https://flagcdn.com/w320/fj.png",
        "countryPhoneLength": 10,
        "shortCode": "679",
        "currency": "FJD",
        "currencySymbol": "$"
    },
    {
        "id": 71,
        "name": "Liechtenstein",
        "countryCode": "+423",
        "countryFlag": "https://flagcdn.com/w320/li.png",
        "countryPhoneLength": 10,
        "shortCode": "423",
        "currency": "CHF",
        "currencySymbol": "Fr"
    },
    {
        "id": 72,
        "name": "Nepal",
        "countryCode": "+977",
        "countryFlag": "https://flagcdn.com/w320/np.png",
        "countryPhoneLength": 10,
        "shortCode": "977",
        "currency": "NPR",
        "currencySymbol": "₨"
    },
    {
        "id": 73,
        "name": "Puerto Rico",
        "countryCode": "+1787",
        "countryFlag": "https://flagcdn.com/w320/pr.png",
        "countryPhoneLength": 10,
        "shortCode": "1787",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 74,
        "name": "Georgia",
        "countryCode": "+995",
        "countryFlag": "https://flagcdn.com/w320/ge.png",
        "countryPhoneLength": 10,
        "shortCode": "995",
        "currency": "GEL",
        "currencySymbol": "₾"
    },
    {
        "id": 75,
        "name": "Pakistan",
        "countryCode": "+92",
        "countryFlag": "https://flagcdn.com/w320/pk.png",
        "countryPhoneLength": 10,
        "shortCode": "92",
        "currency": "PKR",
        "currencySymbol": "₨"
    },
    {
        "id": 76,
        "name": "Monaco",
        "countryCode": "+377",
        "countryFlag": "https://flagcdn.com/w320/mc.png",
        "countryPhoneLength": 10,
        "shortCode": "377",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 77,
        "name": "Botswana",
        "countryCode": "+267",
        "countryFlag": "https://flagcdn.com/w320/bw.png",
        "countryPhoneLength": 10,
        "shortCode": "267",
        "currency": "BWP",
        "currencySymbol": "P"
    },
    {
        "id": 78,
        "name": "Lebanon",
        "countryCode": "+961",
        "countryFlag": "https://flagcdn.com/w320/lb.png",
        "countryPhoneLength": 10,
        "shortCode": "961",
        "currency": "LBP",
        "currencySymbol": "ل.ل"
    },
    {
        "id": 79,
        "name": "Papua New Guinea",
        "countryCode": "+675",
        "countryFlag": "https://flagcdn.com/w320/pg.png",
        "countryPhoneLength": 10,
        "shortCode": "675",
        "currency": "PGK",
        "currencySymbol": "K"
    },
    {
        "id": 80,
        "name": "Mayotte",
        "countryCode": "+262",
        "countryFlag": "https://flagcdn.com/w320/yt.png",
        "countryPhoneLength": 10,
        "shortCode": "262",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 81,
        "name": "Dominican Republic",
        "countryCode": "+1809",
        "countryFlag": "https://flagcdn.com/w320/do.png",
        "countryPhoneLength": 10,
        "shortCode": "1809",
        "currency": "DOP",
        "currencySymbol": "$"
    },
    {
        "id": 82,
        "name": "Norfolk Island",
        "countryCode": "+672",
        "countryFlag": "https://flagcdn.com/w320/nf.png",
        "countryPhoneLength": 10,
        "shortCode": "672",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 83,
        "name": "Bouvet Island",
        "countryCode": "+47",
        "countryFlag": "https://flagcdn.com/w320/bv.png",
        "countryPhoneLength": 10,
        "shortCode": "47",
        "currency": null,
        "currencySymbol": null
    },
    {
        "id": 84,
        "name": "Qatar",
        "countryCode": "+974",
        "countryFlag": "https://flagcdn.com/w320/qa.png",
        "countryPhoneLength": 10,
        "shortCode": "974",
        "currency": "QAR",
        "currencySymbol": "ر.ق"
    },
    {
        "id": 85,
        "name": "Madagascar",
        "countryCode": "+261",
        "countryFlag": "https://flagcdn.com/w320/mg.png",
        "countryPhoneLength": 10,
        "shortCode": "261",
        "currency": "MGA",
        "currencySymbol": "Ar"
    },
    {
        "id": 86,
        "name": "India",
        "countryCode": "+91",
        "countryFlag": "https://flagcdn.com/w320/in.png",
        "countryPhoneLength": 10,
        "shortCode": "91",
        "currency": "INR",
        "currencySymbol": "₹"
    },
    {
        "id": 87,
        "name": "Syria",
        "countryCode": "+963",
        "countryFlag": "https://flagcdn.com/w320/sy.png",
        "countryPhoneLength": 10,
        "shortCode": "963",
        "currency": "SYP",
        "currencySymbol": "£"
    },
    {
        "id": 88,
        "name": "Montenegro",
        "countryCode": "+382",
        "countryFlag": "https://flagcdn.com/w320/me.png",
        "countryPhoneLength": 10,
        "shortCode": "382",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 89,
        "name": "Eswatini",
        "countryCode": "+268",
        "countryFlag": "https://flagcdn.com/w320/sz.png",
        "countryPhoneLength": 10,
        "shortCode": "268",
        "currency": "SZL",
        "currencySymbol": "L"
    },
    {
        "id": 90,
        "name": "Paraguay",
        "countryCode": "+595",
        "countryFlag": "https://flagcdn.com/w320/py.png",
        "countryPhoneLength": 10,
        "shortCode": "595",
        "currency": "PYG",
        "currencySymbol": "₲"
    },
    {
        "id": 91,
        "name": "El Salvador",
        "countryCode": "+503",
        "countryFlag": "https://flagcdn.com/w320/sv.png",
        "countryPhoneLength": 10,
        "shortCode": "503",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 92,
        "name": "Ukraine",
        "countryCode": "+380",
        "countryFlag": "https://flagcdn.com/w320/ua.png",
        "countryPhoneLength": 10,
        "shortCode": "380",
        "currency": "UAH",
        "currencySymbol": "₴"
    },
    {
        "id": 93,
        "name": "Isle of Man",
        "countryCode": "+44",
        "countryFlag": "https://flagcdn.com/w320/im.png",
        "countryPhoneLength": 10,
        "shortCode": "44",
        "currency": "GBP",
        "currencySymbol": "£"
    },
    {
        "id": 94,
        "name": "Namibia",
        "countryCode": "+264",
        "countryFlag": "https://flagcdn.com/w320/na.png",
        "countryPhoneLength": 10,
        "shortCode": "264",
        "currency": "NAD",
        "currencySymbol": "$"
    },
    {
        "id": 95,
        "name": "United Arab Emirates",
        "countryCode": "+971",
        "countryFlag": "https://flagcdn.com/w320/ae.png",
        "countryPhoneLength": 10,
        "shortCode": "971",
        "currency": "AED",
        "currencySymbol": "د.إ"
    },
    {
        "id": 96,
        "name": "Bulgaria",
        "countryCode": "+359",
        "countryFlag": "https://flagcdn.com/w320/bg.png",
        "countryPhoneLength": 10,
        "shortCode": "359",
        "currency": "BGN",
        "currencySymbol": "лв"
    },
    {
        "id": 97,
        "name": "Greenland",
        "countryCode": "+299",
        "countryFlag": "https://flagcdn.com/w320/gl.png",
        "countryPhoneLength": 10,
        "shortCode": "299",
        "currency": "DKK",
        "currencySymbol": "kr."
    },
    {
        "id": 98,
        "name": "Germany",
        "countryCode": "+49",
        "countryFlag": "https://flagcdn.com/w320/de.png",
        "countryPhoneLength": 10,
        "shortCode": "49",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 99,
        "name": "Cambodia",
        "countryCode": "+855",
        "countryFlag": "https://flagcdn.com/w320/kh.png",
        "countryPhoneLength": 10,
        "shortCode": "855",
        "currency": "KHR",
        "currencySymbol": "៛"
    },
    {
        "id": 100,
        "name": "Iraq",
        "countryCode": "+964",
        "countryFlag": "https://flagcdn.com/w320/iq.png",
        "countryPhoneLength": 10,
        "shortCode": "964",
        "currency": "IQD",
        "currencySymbol": "ع.د"
    },
    {
        "id": 101,
        "name": "French Southern and Antarctic Lands",
        "countryCode": "+262",
        "countryFlag": "https://flagcdn.com/w320/tf.png",
        "countryPhoneLength": 10,
        "shortCode": "262",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 102,
        "name": "Sweden",
        "countryCode": "+46",
        "countryFlag": "https://flagcdn.com/w320/se.png",
        "countryPhoneLength": 10,
        "shortCode": "46",
        "currency": "SEK",
        "currencySymbol": "kr"
    },
    {
        "id": 103,
        "name": "Cuba",
        "countryCode": "+53",
        "countryFlag": "https://flagcdn.com/w320/cu.png",
        "countryPhoneLength": 10,
        "shortCode": "53",
        "currency": "CUC",
        "currencySymbol": "$"
    },
    {
        "id": 104,
        "name": "Kyrgyzstan",
        "countryCode": "+996",
        "countryFlag": "https://flagcdn.com/w320/kg.png",
        "countryPhoneLength": 10,
        "shortCode": "996",
        "currency": "KGS",
        "currencySymbol": "с"
    },
    {
        "id": 105,
        "name": "Russia",
        "countryCode": "+73",
        "countryFlag": "https://flagcdn.com/w320/ru.png",
        "countryPhoneLength": 10,
        "shortCode": "73",
        "currency": "RUB",
        "currencySymbol": "₽"
    },
    {
        "id": 106,
        "name": "Malaysia",
        "countryCode": "+60",
        "countryFlag": "https://flagcdn.com/w320/my.png",
        "countryPhoneLength": 10,
        "shortCode": "60",
        "currency": "MYR",
        "currencySymbol": "RM"
    },
    {
        "id": 107,
        "name": "São Tomé and Príncipe",
        "countryCode": "+239",
        "countryFlag": "https://flagcdn.com/w320/st.png",
        "countryPhoneLength": 10,
        "shortCode": "239",
        "currency": "STN",
        "currencySymbol": "Db"
    },
    {
        "id": 108,
        "name": "Cyprus",
        "countryCode": "+357",
        "countryFlag": "https://flagcdn.com/w320/cy.png",
        "countryPhoneLength": 10,
        "shortCode": "357",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 109,
        "name": "Canada",
        "countryCode": "+1",
        "countryFlag": "https://flagcdn.com/w320/ca.png",
        "countryPhoneLength": 10,
        "shortCode": "1",
        "currency": "CAD",
        "currencySymbol": "$"
    },
    {
        "id": 110,
        "name": "Malawi",
        "countryCode": "+265",
        "countryFlag": "https://flagcdn.com/w320/mw.png",
        "countryPhoneLength": 10,
        "shortCode": "265",
        "currency": "MWK",
        "currencySymbol": "MK"
    },
    {
        "id": 111,
        "name": "Saudi Arabia",
        "countryCode": "+966",
        "countryFlag": "https://flagcdn.com/w320/sa.png",
        "countryPhoneLength": 10,
        "shortCode": "966",
        "currency": "SAR",
        "currencySymbol": "ر.س"
    },
    {
        "id": 112,
        "name": "Bosnia and Herzegovina",
        "countryCode": "+387",
        "countryFlag": "https://flagcdn.com/w320/ba.png",
        "countryPhoneLength": 10,
        "shortCode": "387",
        "currency": "BAM",
        "currencySymbol": "KM"
    },
    {
        "id": 113,
        "name": "Ethiopia",
        "countryCode": "+251",
        "countryFlag": "https://flagcdn.com/w320/et.png",
        "countryPhoneLength": 10,
        "shortCode": "251",
        "currency": "ETB",
        "currencySymbol": "Br"
    },
    {
        "id": 114,
        "name": "Spain",
        "countryCode": "+34",
        "countryFlag": "https://flagcdn.com/w320/es.png",
        "countryPhoneLength": 10,
        "shortCode": "34",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 115,
        "name": "Slovenia",
        "countryCode": "+386",
        "countryFlag": "https://flagcdn.com/w320/si.png",
        "countryPhoneLength": 10,
        "shortCode": "386",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 116,
        "name": "Oman",
        "countryCode": "+968",
        "countryFlag": "https://flagcdn.com/w320/om.png",
        "countryPhoneLength": 10,
        "shortCode": "968",
        "currency": "OMR",
        "currencySymbol": "ر.ع."
    },
    {
        "id": 117,
        "name": "Saint Pierre and Miquelon",
        "countryCode": "+508",
        "countryFlag": "https://flagcdn.com/w320/pm.png",
        "countryPhoneLength": 10,
        "shortCode": "508",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 118,
        "name": "Macau",
        "countryCode": "+853",
        "countryFlag": "https://flagcdn.com/w320/mo.png",
        "countryPhoneLength": 10,
        "shortCode": "853",
        "currency": "MOP",
        "currencySymbol": "P"
    },
    {
        "id": 119,
        "name": "San Marino",
        "countryCode": "+378",
        "countryFlag": "https://flagcdn.com/w320/sm.png",
        "countryPhoneLength": 10,
        "shortCode": "378",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 120,
        "name": "Lesotho",
        "countryCode": "+266",
        "countryFlag": "https://flagcdn.com/w320/ls.png",
        "countryPhoneLength": 10,
        "shortCode": "266",
        "currency": "LSL",
        "currencySymbol": "L"
    },
    {
        "id": 121,
        "name": "Marshall Islands",
        "countryCode": "+692",
        "countryFlag": "https://flagcdn.com/w320/mh.png",
        "countryPhoneLength": 10,
        "shortCode": "692",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 122,
        "name": "Sint Maarten",
        "countryCode": "+1721",
        "countryFlag": "https://flagcdn.com/w320/sx.png",
        "countryPhoneLength": 10,
        "shortCode": "1721",
        "currency": "ANG",
        "currencySymbol": "ƒ"
    },
    {
        "id": 123,
        "name": "Iceland",
        "countryCode": "+354",
        "countryFlag": "https://flagcdn.com/w320/is.png",
        "countryPhoneLength": 10,
        "shortCode": "354",
        "currency": "ISK",
        "currencySymbol": "kr"
    },
    {
        "id": 124,
        "name": "Luxembourg",
        "countryCode": "+352",
        "countryFlag": "https://flagcdn.com/w320/lu.png",
        "countryPhoneLength": 10,
        "shortCode": "352",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 125,
        "name": "Argentina",
        "countryCode": "+54",
        "countryFlag": "https://flagcdn.com/w320/ar.png",
        "countryPhoneLength": 10,
        "shortCode": "54",
        "currency": "ARS",
        "currencySymbol": "$"
    },
    {
        "id": 126,
        "name": "Turks and Caicos Islands",
        "countryCode": "+1649",
        "countryFlag": "https://flagcdn.com/w320/tc.png",
        "countryPhoneLength": 10,
        "shortCode": "1649",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 127,
        "name": "Nauru",
        "countryCode": "+674",
        "countryFlag": "https://flagcdn.com/w320/nr.png",
        "countryPhoneLength": 10,
        "shortCode": "674",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 128,
        "name": "Cocos (Keeling) Islands",
        "countryCode": "+61",
        "countryFlag": "https://flagcdn.com/w320/cc.png",
        "countryPhoneLength": 10,
        "shortCode": "61",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 129,
        "name": "Western Sahara",
        "countryCode": "+2125288",
        "countryFlag": "https://flagcdn.com/w320/eh.png",
        "countryPhoneLength": 10,
        "shortCode": "2125288",
        "currency": "DZD",
        "currencySymbol": "دج"
    },
    {
        "id": 130,
        "name": "Dominica",
        "countryCode": "+1767",
        "countryFlag": "https://flagcdn.com/w320/dm.png",
        "countryPhoneLength": 10,
        "shortCode": "1767",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 131,
        "name": "Costa Rica",
        "countryCode": "+506",
        "countryFlag": "https://flagcdn.com/w320/cr.png",
        "countryPhoneLength": 10,
        "shortCode": "506",
        "currency": "CRC",
        "currencySymbol": "₡"
    },
    {
        "id": 132,
        "name": "Australia",
        "countryCode": "+61",
        "countryFlag": "https://flagcdn.com/w320/au.png",
        "countryPhoneLength": 10,
        "shortCode": "61",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 133,
        "name": "Thailand",
        "countryCode": "+66",
        "countryFlag": "https://flagcdn.com/w320/th.png",
        "countryPhoneLength": 10,
        "shortCode": "66",
        "currency": "THB",
        "currencySymbol": "฿"
    },
    {
        "id": 134,
        "name": "Haiti",
        "countryCode": "+509",
        "countryFlag": "https://flagcdn.com/w320/ht.png",
        "countryPhoneLength": 10,
        "shortCode": "509",
        "currency": "HTG",
        "currencySymbol": "G"
    },
    {
        "id": 135,
        "name": "Tuvalu",
        "countryCode": "+688",
        "countryFlag": "https://flagcdn.com/w320/tv.png",
        "countryPhoneLength": 10,
        "shortCode": "688",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 136,
        "name": "Honduras",
        "countryCode": "+504",
        "countryFlag": "https://flagcdn.com/w320/hn.png",
        "countryPhoneLength": 10,
        "shortCode": "504",
        "currency": "HNL",
        "currencySymbol": "L"
    },
    {
        "id": 137,
        "name": "Equatorial Guinea",
        "countryCode": "+240",
        "countryFlag": "https://flagcdn.com/w320/gq.png",
        "countryPhoneLength": 10,
        "shortCode": "240",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 138,
        "name": "Saint Lucia",
        "countryCode": "+1758",
        "countryFlag": "https://flagcdn.com/w320/lc.png",
        "countryPhoneLength": 10,
        "shortCode": "1758",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 139,
        "name": "French Polynesia",
        "countryCode": "+689",
        "countryFlag": "https://flagcdn.com/w320/pf.png",
        "countryPhoneLength": 10,
        "shortCode": "689",
        "currency": "XPF",
        "currencySymbol": "₣"
    },
    {
        "id": 140,
        "name": "Belarus",
        "countryCode": "+375",
        "countryFlag": "https://flagcdn.com/w320/by.png",
        "countryPhoneLength": 10,
        "shortCode": "375",
        "currency": "BYN",
        "currencySymbol": "Br"
    },
    {
        "id": 141,
        "name": "Latvia",
        "countryCode": "+371",
        "countryFlag": "https://flagcdn.com/w320/lv.png",
        "countryPhoneLength": 10,
        "shortCode": "371",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 142,
        "name": "Palau",
        "countryCode": "+680",
        "countryFlag": "https://flagcdn.com/w320/pw.png",
        "countryPhoneLength": 10,
        "shortCode": "680",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 143,
        "name": "Guadeloupe",
        "countryCode": "+590",
        "countryFlag": "https://flagcdn.com/w320/gp.png",
        "countryPhoneLength": 10,
        "shortCode": "590",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 144,
        "name": "Philippines",
        "countryCode": "+63",
        "countryFlag": "https://flagcdn.com/w320/ph.png",
        "countryPhoneLength": 10,
        "shortCode": "63",
        "currency": "PHP",
        "currencySymbol": "₱"
    },
    {
        "id": 145,
        "name": "Gibraltar",
        "countryCode": "+350",
        "countryFlag": "https://flagcdn.com/w320/gi.png",
        "countryPhoneLength": 10,
        "shortCode": "350",
        "currency": "GIP",
        "currencySymbol": "£"
    },
    {
        "id": 146,
        "name": "Denmark",
        "countryCode": "+45",
        "countryFlag": "https://flagcdn.com/w320/dk.png",
        "countryPhoneLength": 10,
        "shortCode": "45",
        "currency": "DKK",
        "currencySymbol": "kr"
    },
    {
        "id": 147,
        "name": "Cameroon",
        "countryCode": "+237",
        "countryFlag": "https://flagcdn.com/w320/cm.png",
        "countryPhoneLength": 10,
        "shortCode": "237",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 148,
        "name": "Guinea",
        "countryCode": "+224",
        "countryFlag": "https://flagcdn.com/w320/gn.png",
        "countryPhoneLength": 10,
        "shortCode": "224",
        "currency": "GNF",
        "currencySymbol": "Fr"
    },
    {
        "id": 149,
        "name": "Bahrain",
        "countryCode": "+973",
        "countryFlag": "https://flagcdn.com/w320/bh.png",
        "countryPhoneLength": 10,
        "shortCode": "973",
        "currency": "BHD",
        "currencySymbol": ".د.ب"
    },
    {
        "id": 150,
        "name": "Suriname",
        "countryCode": "+597",
        "countryFlag": "https://flagcdn.com/w320/sr.png",
        "countryPhoneLength": 10,
        "shortCode": "597",
        "currency": "SRD",
        "currencySymbol": "$"
    },
    {
        "id": 151,
        "name": "DR Congo",
        "countryCode": "+243",
        "countryFlag": "https://flagcdn.com/w320/cd.png",
        "countryPhoneLength": 10,
        "shortCode": "243",
        "currency": "CDF",
        "currencySymbol": "FC"
    },
    {
        "id": 152,
        "name": "Somalia",
        "countryCode": "+252",
        "countryFlag": "https://flagcdn.com/w320/so.png",
        "countryPhoneLength": 10,
        "shortCode": "252",
        "currency": "SOS",
        "currencySymbol": "Sh"
    },
    {
        "id": 153,
        "name": "Czechia",
        "countryCode": "+420",
        "countryFlag": "https://flagcdn.com/w320/cz.png",
        "countryPhoneLength": 10,
        "shortCode": "420",
        "currency": "CZK",
        "currencySymbol": "Kč"
    },
    {
        "id": 154,
        "name": "New Caledonia",
        "countryCode": "+687",
        "countryFlag": "https://flagcdn.com/w320/nc.png",
        "countryPhoneLength": 10,
        "shortCode": "687",
        "currency": "XPF",
        "currencySymbol": "₣"
    },
    {
        "id": 155,
        "name": "Vanuatu",
        "countryCode": "+678",
        "countryFlag": "https://flagcdn.com/w320/vu.png",
        "countryPhoneLength": 10,
        "shortCode": "678",
        "currency": "VUV",
        "currencySymbol": "Vt"
    },
    {
        "id": 156,
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "countryCode": "+290",
        "countryFlag": "https://flagcdn.com/w320/sh.png",
        "countryPhoneLength": 10,
        "shortCode": "290",
        "currency": "GBP",
        "currencySymbol": "£"
    },
    {
        "id": 157,
        "name": "Togo",
        "countryCode": "+228",
        "countryFlag": "https://flagcdn.com/w320/tg.png",
        "countryPhoneLength": 10,
        "shortCode": "228",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 158,
        "name": "British Virgin Islands",
        "countryCode": "+1284",
        "countryFlag": "https://flagcdn.com/w320/vg.png",
        "countryPhoneLength": 10,
        "shortCode": "1284",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 159,
        "name": "Kenya",
        "countryCode": "+254",
        "countryFlag": "https://flagcdn.com/w320/ke.png",
        "countryPhoneLength": 10,
        "shortCode": "254",
        "currency": "KES",
        "currencySymbol": "Sh"
    },
    {
        "id": 160,
        "name": "Niue",
        "countryCode": "+683",
        "countryFlag": "https://flagcdn.com/w320/nu.png",
        "countryPhoneLength": 10,
        "shortCode": "683",
        "currency": "NZD",
        "currencySymbol": "$"
    },
    {
        "id": 161,
        "name": "Heard Island and McDonald Islands",
        "countryCode": "undefined",
        "countryFlag": "https://flagcdn.com/w320/hm.png",
        "countryPhoneLength": 10,
        "shortCode": "ndefined",
        "currency": null,
        "currencySymbol": null
    },
    {
        "id": 162,
        "name": "Rwanda",
        "countryCode": "+250",
        "countryFlag": "https://flagcdn.com/w320/rw.png",
        "countryPhoneLength": 10,
        "shortCode": "250",
        "currency": "RWF",
        "currencySymbol": "Fr"
    },
    {
        "id": 163,
        "name": "Estonia",
        "countryCode": "+372",
        "countryFlag": "https://flagcdn.com/w320/ee.png",
        "countryPhoneLength": 10,
        "shortCode": "372",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 164,
        "name": "Romania",
        "countryCode": "+40",
        "countryFlag": "https://flagcdn.com/w320/ro.png",
        "countryPhoneLength": 10,
        "shortCode": "40",
        "currency": "RON",
        "currencySymbol": "lei"
    },
    {
        "id": 165,
        "name": "Trinidad and Tobago",
        "countryCode": "+1868",
        "countryFlag": "https://flagcdn.com/w320/tt.png",
        "countryPhoneLength": 10,
        "shortCode": "1868",
        "currency": "TTD",
        "currencySymbol": "$"
    },
    {
        "id": 166,
        "name": "Guyana",
        "countryCode": "+592",
        "countryFlag": "https://flagcdn.com/w320/gy.png",
        "countryPhoneLength": 10,
        "shortCode": "592",
        "currency": "GYD",
        "currencySymbol": "$"
    },
    {
        "id": 167,
        "name": "Timor-Leste",
        "countryCode": "+670",
        "countryFlag": "https://flagcdn.com/w320/tl.png",
        "countryPhoneLength": 10,
        "shortCode": "670",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 168,
        "name": "Vietnam",
        "countryCode": "+84",
        "countryFlag": "https://flagcdn.com/w320/vn.png",
        "countryPhoneLength": 10,
        "shortCode": "84",
        "currency": "VND",
        "currencySymbol": "₫"
    },
    {
        "id": 169,
        "name": "Uruguay",
        "countryCode": "+598",
        "countryFlag": "https://flagcdn.com/w320/uy.png",
        "countryPhoneLength": 10,
        "shortCode": "598",
        "currency": "UYU",
        "currencySymbol": "$"
    },
    {
        "id": 170,
        "name": "Vatican City",
        "countryCode": "+3906698",
        "countryFlag": "https://flagcdn.com/w320/va.png",
        "countryPhoneLength": 10,
        "shortCode": "3906698",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 171,
        "name": "Hong Kong",
        "countryCode": "+852",
        "countryFlag": "https://flagcdn.com/w320/hk.png",
        "countryPhoneLength": 10,
        "shortCode": "852",
        "currency": "HKD",
        "currencySymbol": "$"
    },
    {
        "id": 172,
        "name": "Austria",
        "countryCode": "+43",
        "countryFlag": "https://flagcdn.com/w320/at.png",
        "countryPhoneLength": 10,
        "shortCode": "43",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 173,
        "name": "Antigua and Barbuda",
        "countryCode": "+1268",
        "countryFlag": "https://flagcdn.com/w320/ag.png",
        "countryPhoneLength": 10,
        "shortCode": "1268",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 174,
        "name": "Turkmenistan",
        "countryCode": "+993",
        "countryFlag": "https://flagcdn.com/w320/tm.png",
        "countryPhoneLength": 10,
        "shortCode": "993",
        "currency": "TMT",
        "currencySymbol": "m"
    },
    {
        "id": 175,
        "name": "Mozambique",
        "countryCode": "+258",
        "countryFlag": "https://flagcdn.com/w320/mz.png",
        "countryPhoneLength": 10,
        "shortCode": "258",
        "currency": "MZN",
        "currencySymbol": "MT"
    },
    {
        "id": 176,
        "name": "Panama",
        "countryCode": "+507",
        "countryFlag": "https://flagcdn.com/w320/pa.png",
        "countryPhoneLength": 10,
        "shortCode": "507",
        "currency": "PAB",
        "currencySymbol": "B/."
    },
    {
        "id": 177,
        "name": "Micronesia",
        "countryCode": "+691",
        "countryFlag": "https://flagcdn.com/w320/fm.png",
        "countryPhoneLength": 10,
        "shortCode": "691",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 178,
        "name": "Ireland",
        "countryCode": "+353",
        "countryFlag": "https://flagcdn.com/w320/ie.png",
        "countryPhoneLength": 10,
        "shortCode": "353",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 179,
        "name": "Curaçao",
        "countryCode": "+599",
        "countryFlag": "https://flagcdn.com/w320/cw.png",
        "countryPhoneLength": 10,
        "shortCode": "599",
        "currency": "ANG",
        "currencySymbol": "ƒ"
    },
    {
        "id": 180,
        "name": "French Guiana",
        "countryCode": "+594",
        "countryFlag": "https://flagcdn.com/w320/gf.png",
        "countryPhoneLength": 10,
        "shortCode": "594",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 181,
        "name": "Norway",
        "countryCode": "+47",
        "countryFlag": "https://flagcdn.com/w320/no.png",
        "countryPhoneLength": 10,
        "shortCode": "47",
        "currency": "NOK",
        "currencySymbol": "kr"
    },
    {
        "id": 182,
        "name": "Åland Islands",
        "countryCode": "+35818",
        "countryFlag": "https://flagcdn.com/w320/ax.png",
        "countryPhoneLength": 10,
        "shortCode": "35818",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 183,
        "name": "Central African Republic",
        "countryCode": "+236",
        "countryFlag": "https://flagcdn.com/w320/cf.png",
        "countryPhoneLength": 10,
        "shortCode": "236",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 184,
        "name": "Burkina Faso",
        "countryCode": "+226",
        "countryFlag": "https://flagcdn.com/w320/bf.png",
        "countryPhoneLength": 10,
        "shortCode": "226",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 185,
        "name": "Eritrea",
        "countryCode": "+291",
        "countryFlag": "https://flagcdn.com/w320/er.png",
        "countryPhoneLength": 10,
        "shortCode": "291",
        "currency": "ERN",
        "currencySymbol": "Nfk"
    },
    {
        "id": 186,
        "name": "Tanzania",
        "countryCode": "+255",
        "countryFlag": "https://flagcdn.com/w320/tz.png",
        "countryPhoneLength": 10,
        "shortCode": "255",
        "currency": "TZS",
        "currencySymbol": "Sh"
    },
    {
        "id": 187,
        "name": "South Korea",
        "countryCode": "+82",
        "countryFlag": "https://flagcdn.com/w320/kr.png",
        "countryPhoneLength": 10,
        "shortCode": "82",
        "currency": "KRW",
        "currencySymbol": "₩"
    },
    {
        "id": 188,
        "name": "Jordan",
        "countryCode": "+962",
        "countryFlag": "https://flagcdn.com/w320/jo.png",
        "countryPhoneLength": 10,
        "shortCode": "962",
        "currency": "JOD",
        "currencySymbol": "د.ا"
    },
    {
        "id": 189,
        "name": "Mauritania",
        "countryCode": "+222",
        "countryFlag": "https://flagcdn.com/w320/mr.png",
        "countryPhoneLength": 10,
        "shortCode": "222",
        "currency": "MRU",
        "currencySymbol": "UM"
    },
    {
        "id": 190,
        "name": "Lithuania",
        "countryCode": "+370",
        "countryFlag": "https://flagcdn.com/w320/lt.png",
        "countryPhoneLength": 10,
        "shortCode": "370",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 191,
        "name": "United States Minor Outlying Islands",
        "countryCode": "+268",
        "countryFlag": "https://flagcdn.com/w320/um.png",
        "countryPhoneLength": 10,
        "shortCode": "268",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 192,
        "name": "Slovakia",
        "countryCode": "+421",
        "countryFlag": "https://flagcdn.com/w320/sk.png",
        "countryPhoneLength": 10,
        "shortCode": "421",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 193,
        "name": "Angola",
        "countryCode": "+244",
        "countryFlag": "https://flagcdn.com/w320/ao.png",
        "countryPhoneLength": 10,
        "shortCode": "244",
        "currency": "AOA",
        "currencySymbol": "Kz"
    },
    {
        "id": 194,
        "name": "Kazakhstan",
        "countryCode": "+76",
        "countryFlag": "https://flagcdn.com/w320/kz.png",
        "countryPhoneLength": 10,
        "shortCode": "76",
        "currency": "KZT",
        "currencySymbol": "₸"
    },
    {
        "id": 195,
        "name": "Moldova",
        "countryCode": "+373",
        "countryFlag": "https://flagcdn.com/w320/md.png",
        "countryPhoneLength": 10,
        "shortCode": "373",
        "currency": "MDL",
        "currencySymbol": "L"
    },
    {
        "id": 196,
        "name": "Mali",
        "countryCode": "+223",
        "countryFlag": "https://flagcdn.com/w320/ml.png",
        "countryPhoneLength": 10,
        "shortCode": "223",
        "currency": "XOF",
        "currencySymbol": "Fr"
    },
    {
        "id": 197,
        "name": "Falkland Islands",
        "countryCode": "+500",
        "countryFlag": "https://flagcdn.com/w320/fk.png",
        "countryPhoneLength": 10,
        "shortCode": "500",
        "currency": "FKP",
        "currencySymbol": "£"
    },
    {
        "id": 198,
        "name": "Armenia",
        "countryCode": "+374",
        "countryFlag": "https://flagcdn.com/w320/am.png",
        "countryPhoneLength": 10,
        "shortCode": "374",
        "currency": "AMD",
        "currencySymbol": "֏"
    },
    {
        "id": 199,
        "name": "Samoa",
        "countryCode": "+685",
        "countryFlag": "https://flagcdn.com/w320/ws.png",
        "countryPhoneLength": 10,
        "shortCode": "685",
        "currency": "WST",
        "currencySymbol": "T"
    },
    {
        "id": 200,
        "name": "Jersey",
        "countryCode": "+44",
        "countryFlag": "https://flagcdn.com/w320/je.png",
        "countryPhoneLength": 10,
        "shortCode": "44",
        "currency": "GBP",
        "currencySymbol": "£"
    },
    {
        "id": 201,
        "name": "Japan",
        "countryCode": "+81",
        "countryFlag": "https://flagcdn.com/w320/jp.png",
        "countryPhoneLength": 10,
        "shortCode": "81",
        "currency": "JPY",
        "currencySymbol": "¥"
    },
    {
        "id": 202,
        "name": "Bolivia",
        "countryCode": "+591",
        "countryFlag": "https://flagcdn.com/w320/bo.png",
        "countryPhoneLength": 10,
        "shortCode": "591",
        "currency": "BOB",
        "currencySymbol": "Bs."
    },
    {
        "id": 203,
        "name": "Chile",
        "countryCode": "+56",
        "countryFlag": "https://flagcdn.com/w320/cl.png",
        "countryPhoneLength": 10,
        "shortCode": "56",
        "currency": "CLP",
        "currencySymbol": "$"
    },
    {
        "id": 204,
        "name": "United States",
        "countryCode": "+1201",
        "countryFlag": "https://flagcdn.com/w320/us.png",
        "countryPhoneLength": 10,
        "shortCode": "1201",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 205,
        "name": "Saint Vincent and the Grenadines",
        "countryCode": "+1784",
        "countryFlag": "https://flagcdn.com/w320/vc.png",
        "countryPhoneLength": 10,
        "shortCode": "1784",
        "currency": "XCD",
        "currencySymbol": "$"
    },
    {
        "id": 206,
        "name": "Bermuda",
        "countryCode": "+1441",
        "countryFlag": "https://flagcdn.com/w320/bm.png",
        "countryPhoneLength": 10,
        "shortCode": "1441",
        "currency": "BMD",
        "currencySymbol": "$"
    },
    {
        "id": 207,
        "name": "Seychelles",
        "countryCode": "+248",
        "countryFlag": "https://flagcdn.com/w320/sc.png",
        "countryPhoneLength": 10,
        "shortCode": "248",
        "currency": "SCR",
        "currencySymbol": "₨"
    },
    {
        "id": 208,
        "name": "British Indian Ocean Territory",
        "countryCode": "+246",
        "countryFlag": "https://flagcdn.com/w320/io.png",
        "countryPhoneLength": 10,
        "shortCode": "246",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 209,
        "name": "Guatemala",
        "countryCode": "+502",
        "countryFlag": "https://flagcdn.com/w320/gt.png",
        "countryPhoneLength": 10,
        "shortCode": "502",
        "currency": "GTQ",
        "currencySymbol": "Q"
    },
    {
        "id": 210,
        "name": "Ecuador",
        "countryCode": "+593",
        "countryFlag": "https://flagcdn.com/w320/ec.png",
        "countryPhoneLength": 10,
        "shortCode": "593",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 211,
        "name": "Martinique",
        "countryCode": "+596",
        "countryFlag": "https://flagcdn.com/w320/mq.png",
        "countryPhoneLength": 10,
        "shortCode": "596",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 212,
        "name": "Tajikistan",
        "countryCode": "+992",
        "countryFlag": "https://flagcdn.com/w320/tj.png",
        "countryPhoneLength": 10,
        "shortCode": "992",
        "currency": "TJS",
        "currencySymbol": "ЅМ"
    },
    {
        "id": 213,
        "name": "Malta",
        "countryCode": "+356",
        "countryFlag": "https://flagcdn.com/w320/mt.png",
        "countryPhoneLength": 10,
        "shortCode": "356",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 214,
        "name": "Gambia",
        "countryCode": "+220",
        "countryFlag": "https://flagcdn.com/w320/gm.png",
        "countryPhoneLength": 10,
        "shortCode": "220",
        "currency": "GMD",
        "currencySymbol": "D"
    },
    {
        "id": 215,
        "name": "Nigeria",
        "countryCode": "+234",
        "countryFlag": "https://flagcdn.com/w320/ng.png",
        "countryPhoneLength": 10,
        "shortCode": "234",
        "currency": "NGN",
        "currencySymbol": "₦"
    },
    {
        "id": 216,
        "name": "Bahamas",
        "countryCode": "+1242",
        "countryFlag": "https://flagcdn.com/w320/bs.png",
        "countryPhoneLength": 10,
        "shortCode": "1242",
        "currency": "BSD",
        "currencySymbol": "$"
    },
    {
        "id": 217,
        "name": "Kosovo",
        "countryCode": "+383",
        "countryFlag": "https://flagcdn.com/w320/xk.png",
        "countryPhoneLength": 10,
        "shortCode": "383",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 218,
        "name": "Kuwait",
        "countryCode": "+965",
        "countryFlag": "https://flagcdn.com/w320/kw.png",
        "countryPhoneLength": 10,
        "shortCode": "965",
        "currency": "KWD",
        "currencySymbol": "د.ك"
    },
    {
        "id": 219,
        "name": "Maldives",
        "countryCode": "+960",
        "countryFlag": "https://flagcdn.com/w320/mv.png",
        "countryPhoneLength": 10,
        "shortCode": "960",
        "currency": "MVR",
        "currencySymbol": ".ރ"
    },
    {
        "id": 220,
        "name": "South Sudan",
        "countryCode": "+211",
        "countryFlag": "https://flagcdn.com/w320/ss.png",
        "countryPhoneLength": 10,
        "shortCode": "211",
        "currency": "SSP",
        "currencySymbol": "£"
    },
    {
        "id": 221,
        "name": "Iran",
        "countryCode": "+98",
        "countryFlag": "https://flagcdn.com/w320/ir.png",
        "countryPhoneLength": 10,
        "shortCode": "98",
        "currency": "IRR",
        "currencySymbol": "﷼"
    },
    {
        "id": 222,
        "name": "Albania",
        "countryCode": "+355",
        "countryFlag": "https://flagcdn.com/w320/al.png",
        "countryPhoneLength": 10,
        "shortCode": "355",
        "currency": "ALL",
        "currencySymbol": "L"
    },
    {
        "id": 223,
        "name": "Brazil",
        "countryCode": "+55",
        "countryFlag": "https://flagcdn.com/w320/br.png",
        "countryPhoneLength": 10,
        "shortCode": "55",
        "currency": "BRL",
        "currencySymbol": "R$"
    },
    {
        "id": 224,
        "name": "Serbia",
        "countryCode": "+381",
        "countryFlag": "https://flagcdn.com/w320/rs.png",
        "countryPhoneLength": 10,
        "shortCode": "381",
        "currency": "RSD",
        "currencySymbol": "дин."
    },
    {
        "id": 225,
        "name": "Belize",
        "countryCode": "+501",
        "countryFlag": "https://flagcdn.com/w320/bz.png",
        "countryPhoneLength": 10,
        "shortCode": "501",
        "currency": "BZD",
        "currencySymbol": "$"
    },
    {
        "id": 226,
        "name": "Myanmar",
        "countryCode": "+95",
        "countryFlag": "https://flagcdn.com/w320/mm.png",
        "countryPhoneLength": 10,
        "shortCode": "95",
        "currency": "MMK",
        "currencySymbol": "Ks"
    },
    {
        "id": 227,
        "name": "Bhutan",
        "countryCode": "+975",
        "countryFlag": "https://flagcdn.com/w320/bt.png",
        "countryPhoneLength": 10,
        "shortCode": "975",
        "currency": "BTN",
        "currencySymbol": "Nu."
    },
    {
        "id": 228,
        "name": "Venezuela",
        "countryCode": "+58",
        "countryFlag": "https://flagcdn.com/w320/ve.png",
        "countryPhoneLength": 10,
        "shortCode": "58",
        "currency": "VES",
        "currencySymbol": "Bs.S."
    },
    {
        "id": 229,
        "name": "Liberia",
        "countryCode": "+231",
        "countryFlag": "https://flagcdn.com/w320/lr.png",
        "countryPhoneLength": 10,
        "shortCode": "231",
        "currency": "LRD",
        "currencySymbol": "$"
    },
    {
        "id": 230,
        "name": "Jamaica",
        "countryCode": "+1876",
        "countryFlag": "https://flagcdn.com/w320/jm.png",
        "countryPhoneLength": 10,
        "shortCode": "1876",
        "currency": "JMD",
        "currencySymbol": "$"
    },
    {
        "id": 231,
        "name": "Poland",
        "countryCode": "+48",
        "countryFlag": "https://flagcdn.com/w320/pl.png",
        "countryPhoneLength": 10,
        "shortCode": "48",
        "currency": "PLN",
        "currencySymbol": "zł"
    },
    {
        "id": 232,
        "name": "Cayman Islands",
        "countryCode": "+1345",
        "countryFlag": "https://flagcdn.com/w320/ky.png",
        "countryPhoneLength": 10,
        "shortCode": "1345",
        "currency": "KYD",
        "currencySymbol": "$"
    },
    {
        "id": 233,
        "name": "Brunei",
        "countryCode": "+673",
        "countryFlag": "https://flagcdn.com/w320/bn.png",
        "countryPhoneLength": 10,
        "shortCode": "673",
        "currency": "BND",
        "currencySymbol": "$"
    },
    {
        "id": 234,
        "name": "Comoros",
        "countryCode": "+269",
        "countryFlag": "https://flagcdn.com/w320/km.png",
        "countryPhoneLength": 10,
        "shortCode": "269",
        "currency": "KMF",
        "currencySymbol": "Fr"
    },
    {
        "id": 235,
        "name": "Guam",
        "countryCode": "+1671",
        "countryFlag": "https://flagcdn.com/w320/gu.png",
        "countryPhoneLength": 10,
        "shortCode": "1671",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 236,
        "name": "Tonga",
        "countryCode": "+676",
        "countryFlag": "https://flagcdn.com/w320/to.png",
        "countryPhoneLength": 10,
        "shortCode": "676",
        "currency": "TOP",
        "currencySymbol": "T$"
    },
    {
        "id": 237,
        "name": "Kiribati",
        "countryCode": "+686",
        "countryFlag": "https://flagcdn.com/w320/ki.png",
        "countryPhoneLength": 10,
        "shortCode": "686",
        "currency": "AUD",
        "currencySymbol": "$"
    },
    {
        "id": 238,
        "name": "Ghana",
        "countryCode": "+233",
        "countryFlag": "https://flagcdn.com/w320/gh.png",
        "countryPhoneLength": 10,
        "shortCode": "233",
        "currency": "GHS",
        "currencySymbol": "₵"
    },
    {
        "id": 239,
        "name": "Chad",
        "countryCode": "+235",
        "countryFlag": "https://flagcdn.com/w320/td.png",
        "countryPhoneLength": 10,
        "shortCode": "235",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 240,
        "name": "Zimbabwe",
        "countryCode": "+263",
        "countryFlag": "https://flagcdn.com/w320/zw.png",
        "countryPhoneLength": 10,
        "shortCode": "263",
        "currency": "ZWL",
        "currencySymbol": "$"
    },
    {
        "id": 241,
        "name": "Saint Martin",
        "countryCode": "+590",
        "countryFlag": "https://flagcdn.com/w320/mf.png",
        "countryPhoneLength": 10,
        "shortCode": "590",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 242,
        "name": "Mongolia",
        "countryCode": "+976",
        "countryFlag": "https://flagcdn.com/w320/mn.png",
        "countryPhoneLength": 10,
        "shortCode": "976",
        "currency": "MNT",
        "currencySymbol": "₮"
    },
    {
        "id": 243,
        "name": "Portugal",
        "countryCode": "+351",
        "countryFlag": "https://flagcdn.com/w320/pt.png",
        "countryPhoneLength": 10,
        "shortCode": "351",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 244,
        "name": "American Samoa",
        "countryCode": "+1684",
        "countryFlag": "https://flagcdn.com/w320/as.png",
        "countryPhoneLength": 10,
        "shortCode": "1684",
        "currency": "USD",
        "currencySymbol": "$"
    },
    {
        "id": 245,
        "name": "Republic of the Congo",
        "countryCode": "+242",
        "countryFlag": "https://flagcdn.com/w320/cg.png",
        "countryPhoneLength": 10,
        "shortCode": "242",
        "currency": "XAF",
        "currencySymbol": "Fr"
    },
    {
        "id": 246,
        "name": "Belgium",
        "countryCode": "+32",
        "countryFlag": "https://flagcdn.com/w320/be.png",
        "countryPhoneLength": 10,
        "shortCode": "32",
        "currency": "EUR",
        "currencySymbol": "€"
    },
    {
        "id": 247,
        "name": "Israel",
        "countryCode": "+972",
        "countryFlag": "https://flagcdn.com/w320/il.png",
        "countryPhoneLength": 10,
        "shortCode": "972",
        "currency": "ILS",
        "currencySymbol": "₪"
    },
    {
        "id": 248,
        "name": "New Zealand",
        "countryCode": "+64",
        "countryFlag": "https://flagcdn.com/w320/nz.png",
        "countryPhoneLength": 10,
        "shortCode": "64",
        "currency": "NZD",
        "currencySymbol": "$"
    },
    {
        "id": 249,
        "name": "Nicaragua",
        "countryCode": "+505",
        "countryFlag": "https://flagcdn.com/w320/ni.png",
        "countryPhoneLength": 10,
        "shortCode": "505",
        "currency": "NIO",
        "currencySymbol": "C$"
    },
    {
        "id": 250,
        "name": "Anguilla",
        "countryCode": "+1264",
        "countryFlag": "https://flagcdn.com/w320/ai.png",
        "countryPhoneLength": 10,
        "shortCode": "1264",
        "currency": "XCD",
        "currencySymbol": "$"
    }
].map((item) => ({
    label: item.name,
    value: item.name,
    image: item.countryFlag
}))

const PersonalDetails = () => {
  const { handleChange, setFieldTouched, handleSubmit, touched, errors, values, disabled } =
    usePersonalDetails();


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 mt-3">
            <OnboardingHeader
              title="Your personal details"
              description="let us get your personal information"
            />
            <View className="pt-10">
              <Input
                label="Email address"
                touched={touched.phoneNumber}
                className="bg-[#F0F0F0] dark:bg-[#1F1F1F]"
                inputProps={{
                  value: values.phoneNumber,
                  readOnly: true,
                }}
              />
              <Input
                label="First name"
                touched={touched.firstName}
                inputProps={{
                  value: values.firstName,
                  onChangeText: handleChange("firstName"),
                  onFocus: () => setFieldTouched("firstName", true),
                  onBlur: () => setFieldTouched("firstName", false),
                }}
                message={errors.firstName}
              />
              <Input
                label="Middle name"
                touched={touched.middleName}
                inputProps={{
                  value: values.middleName,
                  onChangeText: handleChange("middleName"),
                  onFocus: () => setFieldTouched("middleName", true),
                  onBlur: () => setFieldTouched("middleName", false),
                }}
                message={errors.middleName}
              />
              <Input
                label="Last name"
                touched={touched.lastName}
                inputProps={{
                  value: values.lastName,
                  onChangeText: handleChange("lastName"),
                  onFocus: () => setFieldTouched("lastName", true),
                  onBlur: () => setFieldTouched("lastName", false),
                }}
                message={errors.lastName}
              />
              <Select
                label="Country"
                options={options}
                value={values.country}
                placeholder="Select an option"
                onSelect={(value) => handleChange("country")(value as string)}
              />
              <Input
                label="Address"
                touched={touched.address}
                inputProps={{
                  value: values.address,
                  onChangeText: handleChange("address"),
                  onFocus: () => setFieldTouched("address", true),
                  onBlur: () => setFieldTouched("address", false),
                }}
                message={errors.address}
              />
              <Input
                label="Phone number"
                type="phoneNumber"
                touched={touched.phoneNumber}
                inputProps={{
                  value: values.phoneNumber,
                  onChangeText: handleChange("phoneNumber"),
                  onFocus: () => setFieldTouched("phoneNumber", true),
                  onBlur: () => setFieldTouched("phoneNumber", false),
                }}
                message={errors.phoneNumber}
              />
              <Text className="text-[#888888] text-center my-5 w-[90%] mx-auto">
                Please make sure your name matches the name on your debit card.
              </Text>
              <Button
                type="primary"
                className="w-full"
                disabled={disabled}
                onPress={() => handleSubmit()}
              >
                Continue
              </Button>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;
