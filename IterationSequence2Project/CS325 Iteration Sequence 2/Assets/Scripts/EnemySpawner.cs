using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySpawner : MonoBehaviour
{
    public Enemy enemyToSpawn;
    private Vector2 center;
    public Vector2 size;

    private float timer;
    private bool timerIntervalDecreased;
    public float timerInterval = 10f;
    public bool enemySpawned = false;

    public void OnDrawGizmosSelected()
    {
        Gizmos.color = new Color(1, 0, 0, 0.5f);
        Gizmos.DrawCube(transform.position, size);
    }

    public void SpawnEnemy()
    {
        Vector2 pos = center + new Vector2(Random.Range(-size.x / 2, size.x / 2), (Random.Range(-size.y / 2, size.y / 2)));
        Instantiate(enemyToSpawn, pos, Quaternion.identity);
        enemySpawned = true;
    }

    void Start()
    {
        center = transform.position;
    }

    void Update()
    {
        if ((int)GameManager.timer % 40 == 0 && (int)GameManager.timer != 0)
        {
            if (timerInterval <= 2.5)
            {

            }
            else
            {
                timerIntervalDecreased = true;
                timerInterval -= 2.5f;
                Debug.Log("MIN DECREASED");
            }
        }
        else
        {
            timerIntervalDecreased = false;
        }
        if (timer >= timerInterval)
        {
            if (!enemySpawned)
            SpawnEnemy();
            timer = 0f;
        }
        else
        {
            timer += Time.deltaTime;
        }
    }
}
