//Tableau Embed function
function initViz() {
  url = "https://public.tableau.com/views/BrooklynAnalysis/Q1?:display_count=y&:origin=viz_share_link",
  options = {
      hideToolbar: true,
      width: "100%",
      height: "200px",
  };
  viz = new tableau.Viz(tabMonthlySales, url, options);
}
