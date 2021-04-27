using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public float moveSpeed;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        Move();
    }

    public void Move()
    {
        Vector3 directionY = new Vector3(0, Input.GetAxisRaw("Vertical"));
        Vector3 directionX = new Vector3(Input.GetAxisRaw("Horizontal"), 0);
        Vector3 direction = directionY + directionX;
        transform.position += direction * moveSpeed * Time.deltaTime;
    }
}