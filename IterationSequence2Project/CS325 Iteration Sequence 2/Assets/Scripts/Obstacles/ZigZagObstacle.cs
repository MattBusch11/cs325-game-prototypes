using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ZigZagObstacle : Obstacle
{
    private float directionX = 1f;
    private float timer = 0;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (timer >= 1f)
        {
            directionX *= -1;
            timer = 0f;
        }
        else
        {
            timer += Time.deltaTime;
        }
        Vector3 direction = new Vector3(directionX, -1);
        transform.position += direction * moveSpeed * Time.deltaTime;
    }
}
