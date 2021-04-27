using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StrafeBarrier : MonoBehaviour
{
    public void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("StrafeObstacle"))
        {
            GetComponentInParent<StrafeObstacle>().right = !GetComponentInParent<StrafeObstacle>().right;
        }
    }
}
