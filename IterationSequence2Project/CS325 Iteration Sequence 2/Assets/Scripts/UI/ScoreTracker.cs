using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreTracker : MonoBehaviour
{
    void Update()
    {
        GetComponent<Text>().text = "Score: " + (int)GameManager.timer;
    }
}
