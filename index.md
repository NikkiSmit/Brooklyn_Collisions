---
layout: default
---
  <style>
    p{
     align=”justify”;
    }
 </style>
 


<h3> QUESTION 1: What are the most dangerous streets in Brooklyn? </h3>

 
<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Map/BrooklynStreets?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '650' scrolling='yes' ></iframe> 

<p> 
Since 2012, the top three most dangerous streets resulting in the most deaths in Brooklyn are Atlantic Avenue, Flatbush Avenue and Linden Boulevard. Recent data shows Atlantic Avenue and Flatlands Avenue remain the most affected areas.
<br>
</p>


<h3> Code used </h3>
<xmp>
SELECT
  borough,
  on_street_name,
  SUM(number_of_persons_killed) AS deaths,
  EXTRACT(YEAR FROM timestamp) as year
FROM
  `bigquery-public-data.new_york.nypd_mv_collisions`
WHERE
  on_street_name <> '' and  borough = 'BROOKLYN'
GROUP BY
  borough, on_street_name, year
ORDER BY
  deaths DESC
</xmp>
 


<h3> QUESTION 2: What are the most common causes of motor vehicle collisions in Brooklyn? </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q2_15829872733250/Q2?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '650' scrolling='yes' ></iframe> 

<p> 
The top 3 causes for a motor vehicle collision that resulted in the greatest number of deaths since 2012 are Driver Inattention/Distraction, failure to yield right-of-way and backing unsafely. If we look at the time period 2017-2018, the top 2 causes remain the same.
 
<br>
</p>


<h3> Code used </h3>
<xmp>
 SELECT
  borough,
  contributing_factor_vehicle_1 AS collision_factor,
  COUNT(*) num_collisions,
  EXTRACT(YEAR FROM timestamp) as year
FROM
  `bigquery-public-data.new_york.nypd_mv_collisions`
WHERE
  contributing_factor_vehicle_1 != "Unspecified"
  AND contributing_factor_vehicle_1 != "" AND borough = 'BROOKLYN'
GROUP BY
 borough, collision_factor, 1, year
ORDER BY
  num_collisions DESC
</xmp>


<h3> QUESTION 3: What is the most common time and day for a motor vehicle collision to occur in Brooklyn from 2017-07-01?  </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q3_C/Q3_?:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1300' height = '800' scrolling='yes' ></iframe> 

<p> 
The most common time of day for a motor vehicle collision to occur is at 4pm, which brings in 7.7% of total collisions. If we look at 4pm in the table, we see that the beginning of the week (Mon-Wed) is the most likley time for a collision to occur. Furthermore, when we apply the filter to include only the top three collision factors as discussed above, then the conclusion remains same that 4pm from Monday to Wednesday still remains the unsafest time, as there is a higher chance of being in a  motor vehicle collision.
 
<br>
</p>



<h3> Code used </h3>
<xmp>
SELECT
  borough,
  EXTRACT(YEAR FROM timestamp) as year, 
  EXTRACT(MONTH FROM timestamp) as month, 
  EXTRACT(DAY FROM timestamp) as day, 
  EXTRACT(TIME FROM timestamp) as tod,
  contributing_factor_vehicle_1 AS collision_factor,
  COUNT(*) num_collisions
FROM
  `bigquery-public-data.new_york.nypd_mv_collisions`
WHERE
  contributing_factor_vehicle_1 != "Unspecified"
  AND contributing_factor_vehicle_1 != "" 
  AND borough = 'BROOKLYN'
  AND DATE(timestamp) >= '2017-07-01' 
GROUP BY
 borough, collision_factor, 1, year, month, day, tod
ORDER BY
  num_collisions DESC 
</xmp>
  

<h3> QUESTION 4: What vehicle types are responsbile for most accidents? </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q4_15829894499970/Q4?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '800' scrolling='yes' ></iframe>    

<p> 
Since 2012, it is clear to see that a passenger vehicle and a sport utility/ station wagon are the two main vehicle types responsible for the most number of accidents. Passenger vehicles are responsible for 58.85% of collisions and sport utility/ station wagons are responsible for 24.89% of collisions. From 2017 to 2018, we see the same results (passenger vehicles (53.4%) and sport utility/ station wagons (34.74%)). 

<br>
</p>


<h3> Code used </h3>
<xmp>
SELECT
  borough,
  vehicle_type_code1 AS collision_vehicle,
  COUNT(*) num_collisions,
  EXTRACT(YEAR FROM timestamp) as year, 
FROM
  `bigquery-public-data.new_york.nypd_mv_collisions`
WHERE
  borough = 'BROOKLYN'
GROUP BY
  borough, collision_vehicle, 1, year
ORDER BY
  num_collisions DESC
</xmp>


<h3> Question 5: Collision vehicle by time of day since 2017-09-01 </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q5_15829902547950/Q5?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '450' scrolling='yes' ></iframe>   

<p> 
In the graph above, the yellow line respresents passenger vehicles and the red line represents sport utility/ station wagons. Since 2017, passenger vehicles and sport utility/ station wagons have had the most collisions out of any vehicle type, most of them occuring between 4pm and 5pm.
<br>
</p>


<h3> Code used </h3>
 <xmp> 
SELECT
  borough, 
  EXTRACT(YEAR FROM timestamp) as year, 
  EXTRACT(MONTH FROM timestamp) as month, 
  EXTRACT(DAY FROM timestamp) as day, 
  EXTRACT(TIME FROM timestamp) as tod,
  COUNT(*) num_collisions, vehicle_type_code1 AS collision_vehicle
FROM
  `bigquery-public-data.new_york.nypd_mv_collisions`
WHERE
  borough = 'BROOKLYN' and  DATE(timestamp) >= '2017-09-01' 
GROUP BY
  borough, collision_vehicle, 1, year, month, day, tod, timestamp
ORDER BY
  num_collisions DESC
</xmp>

 
<h3> Question 6: Monthly and yearly averages of deaths of pedestrians in Brooklyn due to vehicle collisions. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q6_15830637556340/Pedestrians?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '800' scrolling='yes' ></iframe>   

<p> 
   
   
It is mainly in winter, November to January, that has the highest monthly average of pedestrian deaths. However, this average picks up again in the summer during the month of July. 2015 was so far the worst year, having a yearly average of 46 pedestrian deaths. 
 
<br>
</p>


<h3> Code used </h3>
<xmp>
WITH totals AS 
(
    SELECT  borough,
            SUM(number_of_pedestrians_killed) AS total_deaths,
            EXTRACT(MONTH FROM timestamp) AS month,
            EXTRACT(YEAR FROM timestamp) AS year
    FROM `bigquery-public-data.new_york.nypd_mv_collisions`
    WHERE borough = 'BROOKLYN'
    GROUP BY borough, year, month
    ORDER BY year, month
),
averages AS 
(
    SELECT  borough, month, year, total_deaths, 
            AVG(total_deaths) over (partition by year) AS yearly_average,
            ROUND( AVG(total_deaths) over (partition by month),2) AS monthly_average
    FROM totals
)
SELECT borough, month,
       year, total_deaths, 
       monthly_average, yearly_average
FROM   averages
WHERE  borough = 'BROOKLYN'
ORDER BY year, month
</xmp>

<h3> Question 7: Monthly and yearly averages of deaths of cyclists in Brooklyn due to vehicle collisions. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q7_15830642282040/Cyclists?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '800' scrolling='yes' ></iframe> 

<p> 
August had the highest monthly average for cyclist deaths, where 2017 had the highest yearly average of 8 cyclist deaths.  However, May to September, which is from the end of spring to the emd of summer, are popular months for cycling and so drivers need to be more aware of cyclists during these months. 

<br>
</p>


<h3> Code used </h3>
<xmp>
WITH totals AS 
(
    SELECT  borough,
            SUM(number_of_cyclist_killed) AS total_deaths,
            EXTRACT(MONTH FROM timestamp) AS month,
            EXTRACT(YEAR FROM timestamp) AS year
    FROM `bigquery-public-data.new_york.nypd_mv_collisions`
    WHERE borough = 'BROOKLYN'
    GROUP BY borough, year, month
    ORDER BY year, month
),
averages AS 
(
    SELECT  borough, month, year, total_deaths, 
            AVG(total_deaths) over (partition by year) AS yearly_average,
            ROUND( AVG(total_deaths) over (partition by month),2) AS monthly_average
    FROM totals
)
SELECT borough, month,
       year, total_deaths, 
       monthly_average, yearly_average
FROM   averages
WHERE  borough = 'BROOKLYN'
ORDER BY year, month
</xmp>


<h3> Question 8: Monthly and yearly averages of deaths of motorists in Brooklyn due to vehicle collisions.  </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q8/Motorists?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '800' scrolling='yes' ></iframe> 

<p> 
May and August had the highest monthly average deaths of motorists with 2013 having the highest yearly average of 33 motorist deaths.
<br>
</p>


<h3> Code used </h3>
<xmp>
WITH totals AS 
(
    SELECT  borough,
            SUM(number_of_motorist_killed) AS total_deaths,
            EXTRACT(MONTH FROM timestamp) AS month,
            EXTRACT(YEAR FROM timestamp) AS year
    FROM `bigquery-public-data.new_york.nypd_mv_collisions`
    WHERE borough = 'BROOKLYN'
    GROUP BY borough, year, month
    ORDER BY year, month
),
averages AS 
(
    SELECT  borough, month, year, total_deaths, 
            AVG(total_deaths) over (partition by year) AS yearly_average,
            ROUND( AVG(total_deaths) over (partition by month),2) AS monthly_average
    FROM totals
)
SELECT borough, month,
       year, total_deaths, 
       monthly_average, yearly_average
FROM   averages
WHERE  borough = 'BROOKLYN'
ORDER BY year, month
</xmp>


<h3> Question 9: Monthly and yearly averages of deaths of persons in Brooklyn due to vehicle collisions. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q9/Persons?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1200' height = '800' scrolling='yes' ></iframe> 

<p> 
August and December had the highest monthly average of person deaths, where 67 person deaths were recorded for each individual year from 2013-2015. 
 
<br>
</p>

<p> Pedestrians are the most at risk, especially during the festive season. </p>


<h3> Code used </h3>
<xmp>
WITH totals AS 
(
    SELECT  borough,
            SUM(number_of_persons_killed) AS total_deaths,
            EXTRACT(MONTH FROM timestamp) AS month,
            EXTRACT(YEAR FROM timestamp) AS year
    FROM `bigquery-public-data.new_york.nypd_mv_collisions`
    WHERE borough = 'BROOKLYN'
    GROUP BY borough, year, month
    ORDER BY year, month
),
averages AS 
(
    SELECT  borough, month, year, total_deaths, 
            AVG(total_deaths) over (partition by year) AS yearly_average,
            ROUND( AVG(total_deaths) over (partition by month),2) AS monthly_average
    FROM totals
)
SELECT borough, month,
       year, total_deaths, 
       monthly_average, yearly_average
FROM   averages
WHERE  borough = 'BROOKLYN'
ORDER BY year, month

</xmp>

<h3> Further considerations when looking at data over time </h3>

<ul style="list-style-type:circle;">
  <li>Were there any events happening in Brooklyn that could have caused more congestion?</li>
  <li>Were there any exogenous factors that could influence the our results e.g. extreme weather conditions for that year?</li>
  <li>Was it during school holidays? This could influence whether a decrease/increase in injuries/deaths was due to families going away on holiday or foreigners come to NY on holiday.</li>
</ul>


<h3> Conclusion </h3>
<p> 
   
The results show that there is an urgent call to action to improve road safety behaviour in Brooklyn, NY. It is important to consider that there are a number of external factors at play e.g. weather conditions, that can be considered. However, the data suggests that the main issue is due to human error. I would suggest that, in addition to the hard policies already implemented, soft policies should implemented or revised. 
 
In behavioural economics there is a term called 'nudging', which is a technique used to change someone’s behaviour in an easy and cost efficient way, without limting their number of choices available (Sunstein, 2009). We often see it described as “non-enforced compliance” or "libertarian paternalism” (Sunstein, 2009). Nudge theory focuses on influencing behaviour by understanding that people make irrational decisions and are influenced by their instincts, mental short cuts and past experiences (Sunstein, 2009). 

The UK Government set up a Behavioural Insights Team in 2010 in order to improve public services to enable people to make ‘better choices for themselves’. Brooklyn should have their own Behavioural Insights team that can focus on implementing effective soft policies. There are a number of case studies that made use of clever ways to subconsciously make drivers slow down or pay attention by using nudge theory, namely, in Scotland (Clearview Intelligence, 2013), Preston (Moskvitch, 2014) and Chicago (Moskvitch, 2014). 

The data concluded that distraction, failure to yield right-of-way and backing unsafely were the three main reasons causing collisions. Government can use use incentives (e.g. tax rebates) to encourage car manufacturers to make use of intelligent transport systems (ITS) that can improve road safety (Stanton and Salmon, 2009). Specifically when it comes to passenger vehicles and sport utility/station wagons. Alternatively, taxes can be implemented on car manufacturers that do not make use of ITS. 

Lastly, better education and less tolerance of reckless behaviour on the roads would be a simpler way to fight driver distraction. This must include knowing which time of year and day one needs to be more alert for pedestrians, cyclists, motorists and people in general.


<br>
</p>

<h3> References </h3>

<ul style="list-style-type:circle;">
  <li>C, M. (2020). Giving road safety a ‘nudge’. [Blog] Available at: https://www.clearview-intelligence.com/blog/giving-road-safety-a-nudge.</li>
  <li>Clearview Intelligence. (2013). Installation helps reduce traffic speed through Fairlie, Scotland. [online] Available at: https://www.clearview-intelligence.com/case-studies/a78-fairlie-traffic-lights.</li>
  <li>Moskvitch, K. (2014). The road design tricks that make us drive safer. [Blog] BBC Future. Available at: https://www.bbc.com/future/article/20140417-road-designs-that-trick-our-minds.</li>
  <li>Patton, P. (2003). DRIVING; Cars That Nudge You to Drive More Safely. The New York Times, [online] p.9. Available at: https://www.nytimes.com/2003/12/26/travel/driving-cars-that-nudge-you-to-drive-more-safely.html.</li>
 <li> Stanton, N. and Salmon, P. (2009). Human error taxonomies applied to driving: A generic driver error taxonomy and its implications for intelligent transport systems. Elsevier, 47(2), pp.227-237. </li>
  <li>Sunstein, C. (2009). Nudge. [S.I.]: Penguin Publishing Group.</li>
   
</ul>  



