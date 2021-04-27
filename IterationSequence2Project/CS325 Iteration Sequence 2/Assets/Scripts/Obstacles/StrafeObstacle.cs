using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StrafeObstacle : Obstacle
{
    private float timer = 0f;
    private Vector3 direction;
    public bool right = true;
    public GameObject obstacle;
    // Start is called before the first frame update
    void Start()
    {
        direction = new Vector3(0, -1);
    }

    // Update is called once per frame
    void Update()
    {
        if (timer >= 2f)
        {
            if (direction.y == -1f)
            {
                direction.y = 0;
            }
            else
            {
                direction.y = -1f;
            }
            timer = 0;
        }
        else
        {
            timer += Time.deltaTime;
        }

        if (direction.y == 0)
        {
            if (right)
            {
                direction.x = 2f;
            }
            else if (!right)
            {
                direction.x = -2f;
            }
            obstacle.transform.position += direction * moveSpeed * Time.deltaTime;
        }
        else
        {
            direction.x = 0;
            transform.position += direction * moveSpeed * Time.deltaTime;
        }
        
    }
}
