using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Obstacle : MonoBehaviour
{
    public float moveSpeed;
    private GameObject sceneFader;
    // Start is called before the first frame update
    void Awake()
    {
        sceneFader = FindObjectOfType<StartGame>().gameObject;
        moveSpeed += 0.25f * ((int)GameManager.timer / 20);
    }

    // Update is called once per frame
    void Update()
    {
        
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
