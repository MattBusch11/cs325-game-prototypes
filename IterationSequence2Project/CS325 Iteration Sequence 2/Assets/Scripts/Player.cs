using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public float moveSpeed;
    public CannonBall cannonBall;
    private float shootCooldown;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        Move();
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Shoot();
        }
        if (shootCooldown > 0)
        {
            shootCooldown -= Time.deltaTime;
        }
    }

    public void Move()
    {
        Vector3 directionY = new Vector3(0, Input.GetAxisRaw("Vertical"));
        Vector3 directionX = new Vector3(Input.GetAxisRaw("Horizontal"), 0);
        Vector3 direction = directionY + directionX;
        transform.position += direction * moveSpeed * Time.deltaTime;
    }

    public void Shoot()
    {
        if (shootCooldown <= 0f)
        {
            CannonBall newCannonBall = Instantiate(cannonBall, transform.position, Quaternion.identity);
            newCannonBall.firedByPlayer = true;
            shootCooldown = 2f;
        }
    }
}
