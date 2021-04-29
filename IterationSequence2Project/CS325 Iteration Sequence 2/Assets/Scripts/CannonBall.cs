using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CannonBall : MonoBehaviour
{
    private Vector3 startingPosition;
    private GameObject sceneFader;
    public Vector3 targetPosition;
    private Vector3 direction;
    private float timer;
    public bool firedByPlayer;
    public float speed;
    // Start is called before the first frame update
    void Start()
    {
        sceneFader = FindObjectOfType<StartGame>().gameObject;
        startingPosition = transform.position;
        if (firedByPlayer)
        {
            targetPosition = new Vector3(startingPosition.x, startingPosition.y + 15);
        }
        direction = (targetPosition - startingPosition).normalized;
    }

    // Update is called once per frame
    void Update()
    {
        transform.position += direction * speed * Time.deltaTime;
        if (timer >= 5f)
        {
            Destroy(this.gameObject);
        }
        else
        {
            timer += Time.deltaTime;
        }
    }

    public void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player") && !firedByPlayer)
        {
            GameManager.playerDead = true;
            Destroy(collision.gameObject);
            Destroy(this.gameObject);
            sceneFader.GetComponent<Animator>().SetTrigger("EndGame");
        }
        else if (collision.CompareTag("Enemy") && firedByPlayer)
        {
            collision.GetComponent<Enemy>().spawner.enemySpawned = false;
            Destroy(collision.gameObject);
            Destroy(this.gameObject);
        }
    }
}
