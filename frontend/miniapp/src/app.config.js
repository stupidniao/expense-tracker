export default {
  pages: [
    "pages/login/index",
    "pages/register/index",
    "pages/home/index",
    "pages/expenses/index",
    "pages/add-expense/index",
    "pages/budgets/index",
    "pages/account/index",
  ],
  tabBar: {
    color: "#999999",
    selectedColor: "#4F46E5",
    backgroundColor: "#ffffff",
    list: [
      { pagePath: "pages/home/index", text: "\u9996\u9875" },
      { pagePath: "pages/expenses/index", text: "\u8d26\u5355" },
      { pagePath: "pages/budgets/index", text: "\u9884\u7b97" },
      { pagePath: "pages/account/index", text: "\u6211\u7684" },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "\u8bb0\u8d26\u672c",
    navigationBarTextStyle: "black",
  },
};
