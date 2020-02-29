---
layout: default
---


<h1> Analyzing data on New York motor vehicle collisions to answer the following question: 
What are my ideas for reducing accidents in Brooklyn? </h1>


<h3> QUESTION 1: What are the most dangerous streets for motor vehicle collisions in Brooklyn? </h3>

 
<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Map/BrooklynStreets?:display_count=y&publish=yes&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 
test

</h4>

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
 


<h3> QUESTION 2: What is the most common factor in a motor vehicle collision in Brooklyn? </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q2/Q2?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>

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


<h3> QUESTION 3.1: What is the most common time for a motor vehicle collision to occur in Brooklyn from 2017-07-01? </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q3/Q3?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>


<h3> QUESTION 3.2: What is the most common time and day for a motor vehicle collision to occur in Brooklyn from 2017-07-01? </h3>

<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q3_2/Q32?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>

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


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q4/Q4?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe>    

<h4> 


</h4>

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

 
<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q5/Q5?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe>   

<h4> 


</h4>

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


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q6/Pedestrians?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe>   

<h4> 


</h4>

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


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q7/Cyclists?:display_count=y&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>

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

<iframe seamless frameborder="0" src="
https://public.tableau.com/views/BrooklynAnalysis-Q8/Motorists?:display_count=y&publish=yes&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>


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


<h3> Question 9:Looking at monthly and yearly averages of deaths of persons in Brooklyn. </h3>


<iframe seamless frameborder="0" src="https://public.tableau.com/views/BrooklynAnalysis-Q9/Persons?:display_count=y&publish=yes&:origin=viz_share_link" width = '650' height = '450' scrolling='yes' ></iframe> 

<h4> 


</h4>

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


