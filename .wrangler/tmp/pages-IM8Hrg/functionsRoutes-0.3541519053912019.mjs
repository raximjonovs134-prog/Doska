import { onRequestPost as __api_auth_login_js_onRequestPost } from "C:\\Users\\Victu\\OneDrive\\Desktop\\doska.uz\\functions\\api\\auth\\login.js"
import { onRequestPost as __api_auth_logout_js_onRequestPost } from "C:\\Users\\Victu\\OneDrive\\Desktop\\doska.uz\\functions\\api\\auth\\logout.js"
import { onRequestGet as __api_auth_verify_js_onRequestGet } from "C:\\Users\\Victu\\OneDrive\\Desktop\\doska.uz\\functions\\api\\auth\\verify.js"
import { onRequestPost as __api_contact_js_onRequestPost } from "C:\\Users\\Victu\\OneDrive\\Desktop\\doska.uz\\functions\\api\\contact.js"
import { onRequestGet as __api_data_js_onRequestGet } from "C:\\Users\\Victu\\OneDrive\\Desktop\\doska.uz\\functions\\api\\data.js"

export const routes = [
    {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/auth/logout",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_logout_js_onRequestPost],
    },
  {
      routePath: "/api/auth/verify",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_verify_js_onRequestGet],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api/data",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_data_js_onRequestGet],
    },
  ]