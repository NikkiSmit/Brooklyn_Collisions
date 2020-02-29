---
layout: default
---


<h1> Analyzing data on New York motor vehicle collisions to answer the following question: 
What are my ideas for reducing accidents in Brooklyn? </h1>


<h3> QUESTION 1: What are the most dangerous streets for motor vehicle collisions in Brooklyn? </h3>

 
<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Map/BrooklynStreets?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '1000' height = '650' scrolling='yes' ></iframe> 

<p> 
The top three most dangerous streets in Brooklyn are Atlantic Avenue, Flatbush Avenue and Linden Boulevard. These streets resulted in the greatest number of deaths since 2012. If we just look at the 2 most recent years (2017-2018), Atlantic Avenue is still the number one most dangerous street, followed by Flatlands Avenue. 
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
 


<h3> QUESTION 2: What is the most common collision factor in a motor vehicle collision in Brooklyn? </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q2_15829872733250/Q2?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '450' scrolling='yes' ></iframe> 

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

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q3_C/Q3_?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '450' scrolling='yes' ></iframe> 

<p> 
The most common time of day for a motor vehicle collision to occur is at 4pm, which brings in 7.7% of total collisions. If we look at 4pm in the table, we see that the beginning of the week (Mon-Wed) is the most likley time for a collision to occur. Furthermore, when we apply the filter to include only the top three collision factors as discussed above, then 4pm, Monday to Wednesday, still remains the unsafest time as there is a higher chance of being in a motor vehicle collision.
 
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


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q4_15829894499970/Q4?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '450' scrolling='yes' ></iframe>    

<p> 
It is clear to see that a passenger vehicle and a sport utility/ station wagon are the two main vehicle types responsible for the most number of accidents. Passenger vehicles are responsible for 58.85% of collisions and sport utility/ station wagons are responsible for 24.89% of collisions, over the entire period since 2012. If we filter the data to look at 2017-2018 data, we see the same results (passenger vehicles (53.4%) and sport utility/ station wagons (34.74%)). 

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

 
<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q5_15829902547950/Q5?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '450' scrolling='yes' ></iframe>   

<p> 
In the graph above, the yellow line respresents passenger vehicles and the red line represents sport utility/ station wagons. These two vehicle types are clearly distinguishable from the other types of vehicles when it comes to bringing in the most number of collisions and the peak time for these collisions to occur is between 4-5pm. 
 
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

 
<h3> Question 6: Looking at monthly and yearly averages of deaths of pedestrians in Brooklyn. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q6/Pedestrians?:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '800' scrolling='yes' ></iframe>   

<p> 
November to January as well as July have the highest monthly averages of pedestrian deaths, with 2015 being the worst year yet, having a yearly average of 46 deaths. 
 
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

<h3> Question 7: Looking at monthly and yearly averages of deaths of cyclists in Brooklyn. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q7/Cyclists?:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '800' scrolling='yes' ></iframe> 

<p> 
August had the highest monthly average for cyclist deaths. 2017 had the highest yearly average of 8 deaths.

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


<h3> Question 8: Looking at monthly and yearly averages of deaths  of motorists in Brooklyn.  </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q8/Motorists?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '800' scrolling='yes' ></iframe> 

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


<h3> Question 9: Looking at monthly and yearly averages of deaths of persons in Brooklyn. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q9/Persons?:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true" width = '650' height = '800' scrolling='yes' ></iframe> 

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


