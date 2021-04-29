using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    private GameObject player;
    public CannonBall cannonBall;
    public EnemySpawner spawner;
    private float timer;

    // Update is called once per frame
    void Update()
    {
        if (timer >= 4f)
        {
            CannonBall newCannonBall = Instantiate(cannonBall, transform.position, Quaternion.identity);
            newCannonBall.targetPosition = FindObjectOfType<Player>().gameObject.transform.position;
            newCannonBall.firedByPlayer = false;
            timer = 0;
        }
        else
        {
            timer += Time.deltaTime;
        }
    }
}
