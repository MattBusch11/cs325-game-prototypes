using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CannonBallCleaner : MonoBehaviour
{
    public void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Cannon Ball"))
        {
            Destroy(collision.gameObject);
        }
    }
}
