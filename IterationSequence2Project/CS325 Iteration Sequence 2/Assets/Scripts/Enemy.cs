using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    private GameObject player;
    private GameObject sceneFader;
    public CannonBall cannonBall;
    public EnemySpawner spawner;
    private float timer;

    public void Start()
    {
        sceneFader = FindObjectOfType<StartGame>().gameObject;
    }
    // Update is called once per frame
    void Update()
    {
        if (timer >= 4f && !GameManager.playerDead)
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

    public void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            GameManager.playerDead = true;
            Destroy(collision.gameObject);
            sceneFader.GetComponent<Animator>().SetTrigger("EndGame");
        }
    }
}
