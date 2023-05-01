export const scrollToTop = () => {
  if (document) {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      all[i].scrollTo(0, 0);
    }
  }
};
