using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObstacleSpawner : MonoBehaviour
{
    public Obstacle obstacleToSpawn;
    private Vector2 center;
    public Vector2 size;

    private float timer;
    private float chanceToSpawn = 30f;
    private bool maxIntervalDecreased;
    private bool minIntervalDecreased;
    private bool chanceIncreased;
    private float moveSpeed;
    public int timerIntervalMin = 3;
    public int timerIntervalMax = 6;

    public void OnDrawGizmosSelected()
    {
        Gizmos.color = new Color(1, 0, 0, 0.5f);
        Gizmos.DrawCube(transform.position, size);
    }

    public void SpawnEnemy()
    {
        Vector2 pos = center + new Vector2(Random.Range(-size.x / 2, size.x / 2), (Random.Range(-size.y / 2, size.y / 2)));
        Instantiate(obstacleToSpawn, pos, Quaternion.identity);
    }

    void Start()
    {
        center = transform.position;
    }

    void Update()
    {
        if ((int)GameManager.timer % 20 == 0 && (int)GameManager.timer != 0)
        {
            Debug.Log("TIMERMODULO" + (int)GameManager.timer % 20);
            if (timerIntervalMax - timerIntervalMin == 0)
            {

            }
            else if (!maxIntervalDecreased)
            {
                maxIntervalDecreased = true;
                timerIntervalMax -= 1;
                Debug.Log("MAX DECREASED");
            }
        }
        else
        {
            maxIntervalDecreased = false;
        }
        if ((int)GameManager.timer % 40 == 0 && (int)GameManager.timer != 0)
        {
            if (timerIntervalMin == 1)
            {

            }
            else if (!minIntervalDecreased)
            {
                minIntervalDecreased = true;
                timerIntervalMin -= 1;
                Debug.Log("MIN DECREASED");
            }
        }
        else
        {
            minIntervalDecreased = false;
        }
        if ((int)GameManager.timer % 60 == 0 && (int)GameManager.timer != 0)
        {
            if (!chanceIncreased)
            {
                chanceIncreased = true;
                chanceToSpawn += 20f;
                Debug.Log("CHANCE INCREASED " + chanceToSpawn);
            }
        }
        else
        {
            chanceIncreased = false;
        }
        if (timer >= Random.Range(timerIntervalMin, timerIntervalMax + 1))
        {
            int spawn = Random.Range(1, 101);
            if (spawn <= chanceToSpawn)
            {
                SpawnEnemy();
                Debug.Log(timerIntervalMin + " " + timerIntervalMax);
                Debug.Log("Spawning Enemy with Timer");
            }
            timer = 0f;
        }
        else
        {
            timer += Time.deltaTime;
        }
    }
}
