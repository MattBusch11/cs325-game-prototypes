using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StraightDownObstacle : Obstacle
{
    // Update is called once per frame
    void Update()
    {
        Vector3 direction = new Vector3(0, -1);
        transform.position += direction * moveSpeed * Time.deltaTime;
    }
}
