package com.d105.game.domain.service;

import com.d105.game.domain.Ranking;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RankingService {

    // 클릭 수를 기반으로 랭킹을 계산하는 메서드
    public List<Ranking> calculateRankings() {
        List<Ranking> rankings = new ArrayList<>();

        // 랭킹 계산 로직을 여기에 추가
        // 예: 데이터베이스에서 클릭 수를 조회하여 랭킹을 계산

        // 더미 데이터로 랭킹 채우기 (실제 구현 시 데이터베이스에서 조회해야 함)
        for (long i = 1; i <= 5; i++) {
            Ranking ranking = new Ranking();
            ranking.setId(i);
            ranking.setUserId(i); // 사용자 ID
            ranking.setScore((int) (Math.random() * 100)); // 임의의 점수
            rankings.add(ranking);
        }

        return rankings; // 계산된 랭킹 반환
    }
}
