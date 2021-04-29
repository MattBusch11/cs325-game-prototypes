using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static float timer = 0f;
    public static bool playerDead = false;
    //private float startTimer = 0f;
    //public bool gameStarted;
    // Start is called before the first frame update
    void Start()
    {
        DontDestroyOnLoad(this.gameObject);
    }

    // Update is called once per frame
    void Update()
    {
        if (SceneManager.GetActiveScene().buildIndex == 0)
        {
            timer = 0f;
            playerDead = false;
            //gameStarted = false;
        }
    }
}
