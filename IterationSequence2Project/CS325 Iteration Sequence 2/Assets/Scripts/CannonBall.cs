using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CannonBall : MonoBehaviour
{
    private Vector3 startingPosition;
    public Vector3 targetPosition;
    private Vector3 direction;
    public bool firedByPlayer;
    public float speed;
    // Start is called before the first frame update
    void Start()
    {
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
    }

    public void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player") && !firedByPlayer)
        {

            Destroy(collision.gameObject);
            Destroy(this.gameObject);
        }
        else if (collision.CompareTag("Enemy") && firedByPlayer)
        {
            collision.GetComponent<Enemy>().spawner.enemySpawned = false;
            Destroy(collision.gameObject);
            Destroy(this.gameObject);
        }
    }
}
