using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreTracker : MonoBehaviour
{
    void Update()
    {
        GameManager.timer += Time.deltaTime;
        GetComponent<Text>().text = "Score: " + (int)GameManager.timer;
    }
}
