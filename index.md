---
layout: default
---


<h1> Analyzing data on New York motor vehicle collisions to answer the following question: 
What are my ideas for reducing accidents in Brooklyn? </h1>


<h2> Data source used: https://bigquery.cloud.google.com/table/bigquery-public-data:new_york.nypd_mv_collisions?tab=preview </h2>

<h3> QUESTION 1: What are the most dangerous streets for motor vehicle collisions in Brooklyn? </h3>

<code>
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
</code>
  
<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div>


<h3> QUESTION 2: What is the most common factor in a motor vehicle collision in Brooklyn? </h3>
<code>
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
</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div>
  

<h3> QUESTION 3: What is the most common time for a motor vehicle collision in Brooklyn from 2017-07-01? </h3>
<code>
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
</code>
  
<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 



<h3> QUESTION 4: What vehicle types responsbile for most accidents? </h3>
<code>
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
</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 

<h3> Question 5: Collision vehicle by date and time since 2017-09-01 </h3>
 <code> 
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
</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 

  
<h3> Question 6: Looking at total deaths, montly averages and yearly averages for the most dangerous borough (Brooklyn) for pedestrians </h3>
 
<code>
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
</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 

<h3> Question 7: Looking at total deaths, montly averages and yearly averages for the most dangerous borough (Brooklyn) for cyclists </h3>

<code>
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
</code>
<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 


  
<h3> Question 8: Looking at total deaths, montly averages and yearly averages for the most dangerous borough (Brooklyn) for motorists </h3>

<code>
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
</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 


<h3> Question 9: Looking at total deaths, montly averages and yearly averages for the most dangerous borough (Brooklyn) for persons </h3>

<code>
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

</code>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div> 
